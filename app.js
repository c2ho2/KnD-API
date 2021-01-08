const qs = require('qs');
const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const _ = require('lodash');

const Item = require('./database/models/item');
const Brand = require('./database/models/brand');
const Transaction = require('./database/models/transaction');

app.use(express.json());

app.set('query parser', function (str) {
    return qs.parse(str, { arrayLimit: Infinity });
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/items', (req, res) => {    
    Item.find(req.body)
        .then(items => res.send(items))
        .catch((error) => console.log(error));
});

app.get('/items/list', (req, res) => {
    var params = _.isEmpty(req.body) ? _.isEmpty(req.params) ? _.isEmpty(req.query) ? {} : req.query : req.params : req.body;
    
    Item.find({_id: {$in: params.list}})
        .then(items => res.send(items))
        .catch((error) => console.log(error));
});

app.post('/items', (req, res) => {
    (new Item({
        'name' : req.body.name,
        'brand' : req.body.brand,
        'category' : req.body.category,
        'volume' : req.body.volume,
        'stock' : req.body.stock,
        'cost' : req.body.cost,
        'price' : req.body.price
    }))
        .save()
        .then((items) => res.send(items))
        .catch((error) => console.log(error));
});

app.patch('/items/:id', (req, res) => {
    Item.findOneAndUpdate({ '_id': req.params.id }, { $set: req.body }, {new: true})
        .then((item) => res.send(item))
        .catch((error) => console.log(error));
});

app.get('/brands', (req, res) => {
    Item.distinct("brand")  
        .then(brands => res.send(brands))
        .catch((error) => console.log(error));
});

app.get('/categories', (req, res) => {
    Item.distinct("category")  
        .then(categories => res.send(categories))
        .catch((error) => console.log(error));
});

app.get('/volumes', (req, res) => {
    Item.distinct("volume")  
        .then(volumes => res.send(volumes))
        .catch((error) => console.log(error));
});

app.get('/transactions', (req, res) => {    
    Transaction.find(req.body)
        .then(transactions => res.send(transactions))
        .catch((error) => console.log(error));
});

app.listen(3000, '0.0.0.0', () => console.log("Server is connected on port 3000"));