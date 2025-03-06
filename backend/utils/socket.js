const socket = require('socket.io')
const { FRONTEND_URL } = require('./constants')
const chatData = require('../model/chatData')

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: FRONTEND_URL
        }
    })

    io.on('connection', (socket) => {
        //Handle Event

        socket.on("joinChat", ({ loggedInUserId, targetUserId }) => {
            const roomId = [loggedInUserId, targetUserId].sort().join("_")
            socket.join(roomId)

        })

        socket.on("sendMessage", async ({ loggedInUserId, targetUserId, text }) => {
            const roomId = [loggedInUserId, targetUserId].sort().join("_")

            const newMessage = new chatData({
                senderId: loggedInUserId,
                receiverId: targetUserId,
                chatMessage: text,
            })
            await newMessage.save()

            io.to(roomId).emit('messageReceived', { text })
        })

        socket.on("disconnect", () => {

        })
    })
}
module.exports = initializeSocket