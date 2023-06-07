const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // new line

const app = express();
const server = http.createServer(app);

app.use(cors()); // new line

const io = socketIo(server, {
	cors: {
		origin: "https://coffee-ping-app.vercel.app/",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("New client connected");

	socket.on("sendNotification", (data) => {
		io.sockets.emit("notification", data);
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
