const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
//const methodOverride = require('method-override');

mongoose.connect('mongodb://0.0.0.0:27017/farmStand')
    .then(() => {
        console.log("MONNGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO ERROR!!!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views')); //helps us to reun server from anywhere(path should be required)
app.set('view engine', 'ejs'); //tell app to use ejs

//app.use = running some code(function) on every single type of request
app.use(express.urlencoded({extended: true}));  // tell express how to parse request(a body parser)
//app.use(methodOverride('_method'));

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category});
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }
})

app.get('/products/new', (req, res) => {
    res.render('products/new');
})

app.post('/products', async (req, res) => {  //where new form Submits
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product });
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product });
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(5000, () => {
    console.log('On Port 5000');
})