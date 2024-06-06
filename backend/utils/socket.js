const Message = require('../models/Chat')
module.exports = (socket) => {
    socket.on('message', async (message) => {
        let newMessage = new Message(message)
        message = await newMessage.save()

        socket.broadcast.emit('messageArrived', message)
    })
    socket.on('messageDeleted', async () => {
        const messages = await Message.find()
        socket.broadcast.emit('fetchMessages')
    })
}