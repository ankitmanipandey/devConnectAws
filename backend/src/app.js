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
require('dotenv').config()

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)

//reading the data

app.get('/user', userAuth, async (req, res) => {
    const query = req.body.userName
    try {
        const data = await User.find({ firstName: query })
        if (!data) {
            return res.status(404).send("User Not Found");
        }
        else {
            return res.send(data)
        }
    }
    catch (err) {
        console.error("Something went wrong")
        return res.status(500).send("Server Error");
    }
})



//Database and server call

connectDB()
    .then(() => {
        console.log('Database connection established')
        app.listen(1111, () => {
            console.log("Connection Success at port 1111");
        })
    })
    .catch((err) => {
        console.error("Error :  Can't connect to the database")
    })