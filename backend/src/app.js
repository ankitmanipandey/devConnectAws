const express = require('express')
const connectDB = require('../config/database.js')
const cookieParser = require('cookie-parser')
const authRouter = require('../routes/auth.js')
const profileRouter = require('../routes/profile.js')
const requestRouter = require('../routes/request.js')
const userRouter = require('../routes/user.js')
const cors = require('cors')
const { FRONTEND_URL } = require('../utils/constants.js')
const paymentRouter = require('../routes/payment.js')
const paymentWebhookRouter = require('../routes/paymentWebhook.js')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 1111

app.use('/', paymentWebhookRouter)
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)
app.use('/', paymentRouter)

//Database and server call

connectDB()
    .then(() => {
        console.log('Database connection established')
        app.listen(port, () => {
            console.log(`Connection Success at port ${port}`);
        })
    })
    .catch((err) => {
        console.error("Error : Can't Connect to the Database")
    })
