const express = require('express')
const mongoose = require('mongoose')
const requestRouter = express.Router()
const userAuth = require('../middlewares/userAuth')
const ConnectionRequest = require('../model/connectionRequest')
const User = require('../model/user')

//sending the connection requests to some other user
requestRouter.post('/request/send/:status/:userId?', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id
        const toUserId = req.params.userId
        const status = req.params.status

        if (!toUserId || !mongoose.Types.ObjectId.isValid(toUserId)) {
            throw new Error("Invalid User Id")
        }

        const toUser = await User.findById(toUserId)
        if (!toUser) {
            throw new Error("User not found")
        }

        const allowedStatusValues = ["ignored", "interested"]
        if (!allowedStatusValues.includes(status)) {
            return res.status(400).send("This status is not allowed")
        }

        const doesConnectionExists = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: fromUserId, toUserId: toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })

        if (doesConnectionExists) {
            return res.status(400).send("Connection Already Exists")
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save()
        res.json({
            message: "Your connection request was sent successfully",
            data,
        })

    }
    catch (err) {
        return res.status(400).send("Error : " + err.message)
    }

})

//reviewing the connections 
requestRouter.post('/request/review/:status/:requestId?', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        const { status, requestId } = req.params
        const allowedStatus = ["accepted", "rejected"]
        if (!requestId || !mongoose.Types.ObjectId.isValid(requestId)) {
            throw new Error("Inavlid Request Id")
        }
        if (!allowedStatus.includes(status)) {
            return res.status(400).send("Status not allowed")
        }
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })
        if (!connectionRequest) {
            return res.status(400).send("Connection request not found")
        }
        connectionRequest.status = status
        const data = await connectionRequest.save()
        return res.status(200).json({ message: "Connection request " + status, data })
    }
    catch (err) {
        return res.status(400).send("Error : " + err.message)
    }

})


module.exports = requestRouter