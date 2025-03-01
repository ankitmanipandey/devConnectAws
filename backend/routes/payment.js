const express = require('express')
const Stripe = require("stripe");
const userAuth = require('../middlewares/userAuth');
const paymentRouter = express.Router()
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const PaymentModel = require('../model/paymentData')



paymentRouter.post("/create-checkout-session/:type", userAuth, async (req, res) => {
    try {
        const planType = req.params.type.toString()
        const user = req.user
        const PRODUCT = {
            name: planType === 'silver' ? "Silver Premium Membership" : "Gold Premium Membership",
            price: planType === 'silver' ? 500 : 1000,
            currency: "INR",
        };
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: PRODUCT.currency,
                        product_data: {
                            name: PRODUCT.name,
                        },
                        unit_amount: PRODUCT.price * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userName: user.name.toString(),
                userId: user._id.toString(),
                membershipType: planType,
                additional_info: "Special discount applied"
            },
            success_url: "http://localhost:5173/premium",
            cancel_url: "http://localhost:5173/premium",
        });
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


paymentRouter.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    let event = req.body;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (endpointSecret) {
        const signature = req.headers['stripe-signature'];
        try {
            console.log("inside the signature try")
            event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
            console.log("after the event")
        }
        catch (err) {
            console.error("webhook sign verification failed" + err.message)
            return res.status(400).send(err.message)
        }
    }
    console.log("no error in signature")
    const session = event.data.object //this we get from the object 'event'
    console.log(event.type)
    console.log(typeof (event.type) === string)
    if (event.type === 'checkout.session.completed') {
        try {
            console.log("checkout started")
            const payment = await PaymentModel.create({
                orderId: session.id,
                userName: session.metadata.userName,
                userId: session.metadata.userId,
                membershipType: session.metadata.membershipType,
                price: (session.amount_total) / 100
            })
            console.log("data saved in database")
            return res.status(200).json({ success: true, message: "Payment processed successfully" })
        }
        catch (err) {
            return res.status(400).json({ success: false, message: "Transaction failed" + err.message })
        }
    }
    return res.status(200).json({ received: true });
});


module.exports = paymentRouter