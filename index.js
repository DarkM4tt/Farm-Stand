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

app.get('/dog', (req, res) => {
    res.send('WOOF!');
})

app.listen(5000, () => {
    console.log('App Is Listening On Port 5000!');
})
