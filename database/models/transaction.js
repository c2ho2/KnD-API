const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    account : {
        type: String
    },
    date : {
        type: Date
    },
    description : {
        type: String
    },
    category: {
        type: String
    },
    client : {
        type: String
    },
    items: {
        type: {
            amount: Number,
            id: mongoose.Types.ObjectId
        }
    },
    amount: {
        type: Number
    }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;