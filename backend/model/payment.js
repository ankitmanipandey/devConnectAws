const mongoose = require('mongoose')
const paymentSchema = mongoose.Schema({
    
}, { timestamps: true })

const PaymentModel = new mongoose.model("paymentModel", paymentSchema)
export default PaymentModel