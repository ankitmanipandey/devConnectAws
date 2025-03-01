const express = require('express')
const Stripe = require("stripe");
const paymentRouter = express.Router()
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);



paymentRouter.post("/create-checkout-session/:type", async (req, res) => {
    try {
        const planType = req.params.type.toString()
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
                note: `User is purchasing ${PRODUCT.name}`,
                userId: "12345",
                additional_info: "Special discount applied"
            },
            success_url: "http://localhost:5173/premium",
            cancel_url: "http://localhost:5173/premium",
        });
        console.log(session)
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = paymentRouter