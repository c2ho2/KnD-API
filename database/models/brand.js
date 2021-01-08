const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    name : {
        type: String
    },
    code : {
        type: String
    }
});

const Brand = mongoose.model('Brand', BrandSchema);

module.exports = Brand;