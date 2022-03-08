const express = require('express');
const app = express();
const path = require('path'); //to set views directory
const mongoose = require('mongoose');
const Product = require('./models/product'); //required our product schema

mongoose.connect('mongodb://0.0.0.0:27017/farmStand')
    .then(() => {
        console.log("MONNGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO ERROR!!!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views')); //for absolute path
app.set('view engine', 'ejs'); //told express to use EJS
app.use(express.urlencoded({extended: true}))

app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products });
})

app.get('/products/new', (erq, res) => {
    res.render('products/new');
})

app.post('/products', async (req, res) => {  //where new form submits
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

app.get('/products/:id', async (req, res) => {
    const id = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product });
})

app.listen(5000, () => {
    console.log('App Is Listening On Port 5000!');
})
