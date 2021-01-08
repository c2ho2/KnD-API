const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name : {
        type: String
    },
    brand : {
        type: String
    },
    category : {
        type: String
    },
    volume : {
        type: String
    },
    stock : {
        type: Number
    },
    cost : {
        type: Number
    },
    price : {
        type: Number
    }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;