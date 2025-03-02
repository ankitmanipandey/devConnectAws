const express = require('express')
const Stripe = require("stripe");
const paymentWebhookRouter = express.Router()
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const PaymentModel = require('../model/paymentData')


paymentWebhookRouter.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    let event = req.body;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (endpointSecret) {
        const signature = req.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
        }
        catch (err) {
            console.error("Webhook Signature Verification failed " + err.message)
            return res.status(400).send(err.message)
        }
    }
    const session = event.data.object //this we get from the object 'event'
    if (event.type === 'checkout.session.completed') {
        try {
            const payment = await PaymentModel.create({
                orderId: session.id,
                userName: session.metadata.userName,
                userId: session.metadata.userId.toString(),
                membershipType: session.metadata.membershipType,
                price: session.amount_total / 100
            })
        }
        catch (err) {
            return res.status(400).json({ success: false, message: "Transaction failed" })
        }
    }
    return res.status(200).json({ success: true, message: "Payment Done Successfully" });
});

module.exports = paymentWebhookRouter