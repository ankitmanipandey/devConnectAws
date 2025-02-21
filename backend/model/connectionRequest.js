const mongoose = require('mongoose');
const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        },
        // validate: {
        //     validator: function (value) {
        //         return ["ignored", "interested", "accepted", "rejected"].includes(value)
        //     },
        //     message: '{ VALUE } is not correct status value'

        // }
    }
}, { timestamps: true });


connectionRequestSchema.pre("save", function () {
    const connectionRequest = this
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("You can't send request yourself")
    }
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema)


module.exports = ConnectionRequestModel

