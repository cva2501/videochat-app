const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
global.io = require('socket.io').listen(httpServer)

io.on("connection", (socket) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

server.listen(3002, "https://cva2501.github.io/videochat-app/",() => {
	console.info(`Socket server started on ${'https://cva2501.github.io/videochat-app/'}:${3002} (${ENV})`);
  })