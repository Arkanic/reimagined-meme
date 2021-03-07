import http from "http";
import express from "express";
import socketio from "socket.io";

import constants from "./shared/constants";
import Game from "./server/game";

import * as Data from "./shared/inputObject";

const port = process.env.PORT || 8080; // port is the specified port or port 8080.

const app:express.Application = express();
app.set("port", port);
app.use(express.static("dist"));

let protoServer:http.Server = new http.Server(app);
let io:socketio.Server = new socketio.Server(protoServer);

const msg = constants.msg;

io.on("connection", function(socket:socketio.Socket) {
    socket.on(msg.join, joinGame);
    socket.on(msg.input, handleInput);

    socket.on("disconnect", disconnect);
});

protoServer.listen(8080, function() {
    console.log(`Server is now listening @ port ${port}`);
});

let game = new Game();

function joinGame(this:socketio.Socket, data:any):void {
    console.log("A user connected.");
    data = data.data;
    let cleanedData:Data.Join = {
        username:data.username || `Player#${Math.floor(Math.random()*10000)}`,
        screenWidth:data.screenWidth || 1600,
        screenHeight:data.screenHeight || 900
    };
    game.addPlayer(this, cleanedData);
}

function handleInput(this:socketio.Socket, data:any):void {
    data = data.state
    let cleanedData:Data.Input = {
        mouseX:data.mouseX || game.players[this.id].screen.x/2,
        mouseY:data.mouseY || game.players[this.id].screen.y/2,
        clicking:data.clicking,
        keys: {
            w:data.keys.w || false,
            a:data.keys.a || false,
            s:data.keys.s || false,
            d:data.keys.d || false
        }
    }
    game.handleInput(this, cleanedData);
}

function disconnect(this:socketio.Socket) {
    console.log("A user disconnected.");
    game.removePlayer(this);
}