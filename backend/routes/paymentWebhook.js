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
            console.log(signature)
            console.log("inside the signature try")
            event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
            console.log("after the event")
        }
        catch (err) {
            console.error("webhook sign verification failed" + err.message)
            return res.status(400).send(err.message)
        }
    }
    // console.log("no error in signature")
    // const session = event.data.object //this we get from the object 'event'
    // console.log(event.type)
    // console.log(typeof (event.type) === string)
    // if (event.type === 'checkout.session.completed') {
    //     try {
    //         console.log("checkout started")
    //         const payment = await PaymentModel.create({
    //             orderId: session.id,
    //             userName: session.metadata.userName,
    //             userId: session.metadata.userId,
    //             membershipType: session.metadata.membershipType,
    //             price: (session.amount_total) / 100
    //         })
    //         console.log("data saved in database")
    //         return res.status(200).json({ success: true, message: "Payment processed successfully" })
    //     }
    //     catch (err) {
    //         return res.status(400).json({ success: false, message: "Transaction failed" + err.message })
    //     }
    // }
    // return res.status(200).json({ received: true });
});

module.exports = paymentWebhookRouter