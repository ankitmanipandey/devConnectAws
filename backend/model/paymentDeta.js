const mongoose = require('mongoose')
const paymentSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    membershipType: {
        type: String,
        required: true,
        enum: ["gold", "silver"]
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const PaymentModel = new mongoose.model("paymentModel", paymentSchema)
module.exports = PaymentModel