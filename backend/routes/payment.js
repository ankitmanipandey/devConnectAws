const express = require('express')
const Stripe = require("stripe");
const userAuth = require('../middlewares/userAuth');
const paymentRouter = express.Router()
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);



paymentRouter.post("/create-checkout-session/:type", userAuth, async (req, res) => {
    try {
        const planType = req.params.type.toString()
        console.log("starting the checkout")
        const user = req.user
        const PRODUCT = {
            name: planType === 'silver' ? "Silver Premium Membership" : "Gold Premium Membership",
            price: planType === 'silver' ? 500 : 1000,
            currency: "INR",
        };
        console.log("before the session")
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: PRODUCT.currency,
                        product_data: {
                            name: PRODUCT?.name,
                        },
                        unit_amount: PRODUCT.price * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userName: user?.name?.toString(),
                userId: user?._id.toString(),
                membershipType: planType,
                additional_info: "Special discount applied"
            },
            success_url: "http://localhost:5173/premium",
            cancel_url: "http://localhost:5173/premium",
        });
        console.log("after the session")
        return res.json({ id: session.id });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



module.exports = paymentRouter