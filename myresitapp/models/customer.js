const mongoose = require("mongoose");

//customers collection schema
const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    property_id: {
        type: Number,
        required: true
    },
    property_price: {
        type: Number,
        required: true
    }
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;