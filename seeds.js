//This file would give data(initial) to our database(seed our database)

const Product = require('./models/product');  //required our product schema
const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/farmStand')
    .then(() => {
        console.log("MONNGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO ERROR!!!!")
        console.log(err)
    })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'fruit'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 4.99,
        category: 'fruit'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })