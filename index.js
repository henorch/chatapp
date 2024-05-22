import express from "express";
import { createServer } from 'http';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer)

const __dirname = dirname(fileURLToPath(import.meta.url))
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'indx.html'))
})
let connectedUser = {}
io.on('connection', (socket) => {
    connectedUser[socket.id] = socket.id;
    io.emit('updatedUserList', Object.values(connectedUser))

    socket.on('disconnect', () => {
        delete connectedUser[socket.id];

        io.emit('updatedUserList', Object.values(connectedUser))
    })
    socket.on('chat_message', (message) => {
        console.log(message);
        io.emit('chat_message', {
            text: message.msg,
            date: new Date(),
            id: socket.id
        })
    })



})

httpServer.listen(3000)