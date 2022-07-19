import http from "http";
import express from "express";
import socketio from "socket.io";

import constants from "./shared/constants";
import Game from "./server/game";
import * as protocol from "./server/protocol";

import * as Data from "./shared/types/inputObject";

const port = process.env.PORT || 8080; // port is the specified port or port 8080.

const app:express.Application = express();
app.set("port", port);
app.use(express.static("dist"));

let protoServer:http.Server = new http.Server(app);
let io:socketio.Server = new socketio.Server(protoServer);

const msg = constants.msg;

io.on("connection", function(socket:socketio.Socket) {
    socket.on(msg.join, joinGame);
    socket.on(msg.mouseinput, handleMouseInput);
    socket.on(msg.keyboardinput, handleKeyboardInput);
    socket.on(msg.chatmessage, chatMessage);

    socket.on("disconnect", disconnect);

    process.on("SIGINT", () => {
        socket.emit(msg.serverclosing, {message:"Server is shutting down"});
        process.exit(0);
    });
});

protoServer.listen(8080, function() {
    console.log(`Server is now listening @ port ${port}`);
});

let game = new Game();

function checkValidation(s:socketio.Socket, json:any, policy:string):boolean {
    if(!protocol.validateInput(json, policy)) {
        s.emit(msg.serverclosing, {message:"Protocol error. This is either a bug, or you have done something you shouldn't have."});
        s.disconnect();

        return true;
    }

    return false;
}

function joinGame(this:socketio.Socket, data:any):void {
    console.log("A user connected.");
    data = data.data;
    if(checkValidation(this, data, "Join")) return;

    let cleanedData:Data.Join = {
        username:String(data.username).substring(0, 50) || `Player#${Math.floor(Math.random()*10000)}`,
        screenWidth:Number(data.screenWidth) || 1600,
        screenHeight:Number(data.screenHeight) || 900
    };
    game.addPlayer(this, cleanedData);
}

function handleMouseInput(this:socketio.Socket, data:any):void {
    data = data.state;
    if(checkValidation(this, data, "MouseInput")) return;

    let cleanedData:Data.MouseInput = {
        mouseX:Number(data.mouseX) || game.players[this.id].screen.x/2,
        mouseY:Number(data.mouseY) || game.players[this.id].screen.y/2,
        clicking:Boolean(data.clicking),
    }
    game.handleMouseInput(this, cleanedData);
}

function handleKeyboardInput(this:socketio.Socket, data:any):void {
    data = data.state;
    if(checkValidation(this, data, "KeyboardInput")) return;

    let cleanedData:Data.KeyboardInput = {
        w:Boolean(data.w) || false,
        a:Boolean(data.a) || false,
        s:Boolean(data.s) || false,
        d:Boolean(data.d) || false
    }
    game.handleKeyboardInput(this, cleanedData);
}

function chatMessage(this:socketio.Socket, data:any):void {
    data = data.data;
    if(checkValidation(this, data, "Message")) return;

    if(!data.message) return;
    game.chatMessage(this, String(data.message));
}

function disconnect(this:socketio.Socket) {
    console.log("A user disconnected.");
    game.removePlayer(this);
}