import http from "http";

import express from "express";
import socketio from "socket.io";

const port = process.env.PORT || 8080; // port is the specified port or port 8080.

const app:express.Application = express();
app.set("port", port);
app.use(express.static("dist"));

let protoServer:http.Server = new http.Server(app);
let io:socketio.Server = new socketio.Server(protoServer);

io.on("connection", function(socket:socketio.Socket) {
    console.log("A user connected.");
});

const server:http.Server = protoServer.listen(8080, function() {
    console.log(`Server is now listening @ port ${port}`);
});