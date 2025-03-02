const express = require('express')
const Stripe = require("stripe");
const paymentWebhookRouter = express.Router()
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const PaymentModel = require('../model/paymentData')


paymentWebhookRouter.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    let event = req.body;
    console.log("before starting webhook")
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (endpointSecret) {
        const signature = req.headers['stripe-signature'];
        try {
            console.log("inside the try signature")
            event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
        }
        catch (err) {
            console.error("Webhook Signature Verification failed " + err.message)
            return res.status(400).send(err.message)
        }
    }
    console.log("outside the try signature")
    const session = event.data.object //this we get from the object 'event'
    if (event.type === 'checkout.session.completed') {
        try {
            console.log("inside the db call")
            const payment = await PaymentModel.create({
                orderId: session.id,
                userName: session.metadata.userName,
                userId: session.metadata.userId,
                membershipType: session.metadata.membershipType,
                price: (session.amount_total) / 100
            })
            console.log("data store successfully")
            return res.status(200).json({ success: true, message: "Payment processed successfully" })
        }
        catch (err) {
            return res.status(400).json({ success: false, message: "Transaction failed" + err.message })
        }
    }
    return res.status(200).json({ received: true });
});

module.exports = paymentWebhookRouter