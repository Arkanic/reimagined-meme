import io from "socket.io";
import striptags from "striptags";
import Player from "./player";
import Vector2 from "./types/vector2";
import * as Data from "../shared/types/inputObject";
import * as Serialized from "../shared/types/serializedData";

import constants from "../shared/constants";


class Game {
    sockets:{[key:string]:io.Socket};
    players:{[ket:string]:Player};


    constructor() {
        this.sockets = {};
        this.players = {};

        setInterval(this.update.bind(this), 10); // .bind() makes it run on the local scope, rather than having update() run on the default values for the class
    }

    addPlayer(socket:io.Socket, data:Data.Join):void {
        this.sockets[socket.id] = socket;

        const position:Vector2 = new Vector2(Math.floor(constants.map.size * (0.25 + Math.random() * 0.5)), Math.floor(constants.map.size * (0.25 + Math.random() * 0.5)));
        const screen:Vector2 = new Vector2(data.screenWidth, data.screenHeight);
        this.players[socket.id] = new Player(socket.id, position, screen, striptags(data.username));
    }

    removePlayer(socket:io.Socket):void {
        delete this.sockets[socket.id];
        delete this.players[socket.id];
    }

    handleMouseInput(socket:io.Socket, state:Data.MouseInput):void {
        if(!this.players[socket.id]) return;
        this.players[socket.id].translateMouseInput(state);
    }

    handleKeyboardInput(socket:io.Socket, state:Data.KeyboardInput):void {
        if(!this.players[socket.id]) return;
        this.players[socket.id].translateKeyboardInput(state);
    }

    chatMessage(sender:io.Socket, message:string):void {
        Object.keys(this.sockets).forEach(id => {
            const socket = this.sockets[id];
            socket.emit(constants.msg.chatmessage, {message:striptags(message).slice(0, 300), sender:sender.id});
        });
    }

    update():void {
        Object.keys(this.sockets).forEach(id => {
            const socket = this.sockets[id];
            const player = this.players[id];

            player.update();

            socket.emit(constants.msg.update, this.createUpdate(player));
        });
    }

    createUpdate(player:Player):Serialized.World {
        const nearbyPlayers:Array<Player> = Object.values<Player>(this.players).filter(
            p => p !== player && p.distanceTo(player) <= constants.map.size
        );

        return {
            time: Date.now(),
            me: player.serialize(),
            others: nearbyPlayers.map(p => p.serialize())
        }
    }
}
export default Game;