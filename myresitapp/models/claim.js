const mongoose = require("mongoose");

//claims collection schema
const ClaimSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    damage_amount: {
        type: Number,
        required: true
    },
    damage_type: {
        type: String,
        required: true
    }
});

const Claim = mongoose.model('Claim', ClaimSchema);

module.exports = Claim;