const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config()
const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send("Please Login!")
        }
        const decodedMsg = await jwt.verify(token, process.env.PRIVATE_KEY);
        const { _id } = decodedMsg
        const user = await User.findOne({ _id: _id })
        if (!user) {
            return res.status(404).send("User not found")
        }
        req.user = user
        next()
    }
    catch (err) {
        res.status(400).send(err.message)
    }

}

module.exports = userAuth