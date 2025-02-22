const express = require('express')
const User = require('../model/user.js')
const connectDB = require('../config/database.js')
const cookieParser = require('cookie-parser')
const userAuth = require('../middlewares/userAuth.js')
const authRouter = require('../routes/auth.js')
const profileRouter = require('../routes/profile.js')
const requestRouter = require('../routes/request.js')
const userRouter = require('../routes/user')
const cors = require('cors')
const { FRONTEND_URL } = require('../utils/constants.js')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 1111


app.use(cors({
<<<<<<< HEAD
    origin: FRONTEND_URL,
=======
    origin: "https://devconnect-frontend-ozys.onrender.com",
>>>>>>> origin/main
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)

//Database and server call

connectDB()
    .then(() => {
        console.log('Database connection established')
        app.listen(port, () => {
            console.log(`Connection Success at port ${port}`);
        })
    })
    .catch((err) => {
        console.error("Error :  Can't Connect to the Database")
    })
