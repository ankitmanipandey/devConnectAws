const express = require('express');
const validateSignUpData = require('../utils/postValidate');
const bcrypt = require('bcrypt')
const User = require('../model/user.js')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()

//creating the data / signup

authRouter.post('/signup', async (req, res) => {
    const { name, emailId, photoUrl,
        about, password, skills } = req.body
    try {
        //validation of data
        validateSignUpData(req)
        //encryption of password
        const hashedPassword = await bcrypt.hash(password, 10)
        const userExists = await User.findOne({
            emailId: emailId
        })
        if (userExists) {
            throw new Error("Email already exists")
        }
        const user = await User.create({
            name, emailId, photoUrl
            , password: hashedPassword, skills: skills.split(","), about
        })
        const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "none",
            path: "/"
        })

        return res.status(200).send(user)
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
})

//login api

authRouter.post('/login', async (req, res) => {
    const { emailId, password } = req.body
    try {
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("User Credentials are invalid!")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
            const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "7d" })
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "none",
                path: "/"
            })
            return res.send(user)
        }
        else {
            return res.status(400).send("User Credentials are invalid!")
        }
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
})

//logout api

authRouter.post('/logout', (req, res) => {
    try {
        res.cookie("token", null,
            {
                expiresIn: new Date(Date.now())

            }
        )
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "none",
            path: "/"
        });
        return res.send("Signout Successful")
    }
    catch (err) {
        return res.status(400).send("Something went wrong")
    }

})

module.exports = authRouter