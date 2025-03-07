const socket = require('socket.io')
const { FRONTEND_URL } = require('./constants')
const chatData = require('../model/chatData')
const crypto = require('crypto')


const getSecretRoomId = (loggedInUserId, targetUserId) => {
    const hash = crypto.createHash('sha256')
        .update([loggedInUserId, targetUserId].sort().join("@AnkitC@Der"))
        .digest("hex")

    return hash
}
const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: FRONTEND_URL,
            methods: ["GET", "POST"],
            credentials: true
        },
        transports: ["websocket", "polling"]
    })
    console.log("WebSocket Server Initialized")

    io.on('connection', (socket) => {
        //Handle Event

        socket.on("joinChat", ({ loggedInUserId, targetUserId }) => {
            const roomId = getSecretRoomId(loggedInUserId, targetUserId)
            socket.join(roomId)
            console.log("Roomi Joined")

        })

        socket.on("sendMessage", async ({ loggedInUserId, targetUserId, message }) => {
            try {
                console.log("Inside the send Message block")
                const roomId = getSecretRoomId(loggedInUserId, targetUserId)
                const newMessage = new chatData({
                    senderId: loggedInUserId,
                    receiverId: targetUserId,
                    chatMessage: message,
                })
                await newMessage.save()
                io.to(roomId).emit('messageReceived', newMessage)
            }
            catch (err) {
                console.log("Error in Sending message")
            }
        })

        socket.on("disconnect", () => {
            try {
                socket.rooms.forEach(room => socket.leave(room));
                console.log("socket disconnected")
            }
            catch (err) {
                console.log("Error in socket disconnection")
            }
        })
    })
}
module.exports = initializeSocket