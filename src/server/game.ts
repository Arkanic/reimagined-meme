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

    /**
     * Adds a player to the game object
     * 
     * @param socket The socket.io object of the player
     * @param data The join data given by the client
     */
    addPlayer(socket:io.Socket, data:Data.Join):void {
        this.sockets[socket.id] = socket;

        const position:Vector2 = new Vector2(Math.floor(constants.map.size * (0.25 + Math.random() * 0.5)), Math.floor(constants.map.size * (0.25 + Math.random() * 0.5)));
        const screen:Vector2 = new Vector2(data.screenWidth, data.screenHeight);
        this.players[socket.id] = new Player(socket.id, position, screen, striptags(data.username));
    }

    /**
     * Removes a player from the game object
     * 
     * @param socket The socket.io object of the player
     */
    removePlayer(socket:io.Socket):void {
        delete this.sockets[socket.id];
        delete this.players[socket.id];
    }

    /**
     * Handles the mouse input event sent by the client
     * 
     * @param socket The socket.io object of the player
     * @param state The mouse state given by the player
     */
    handleMouseInput(socket:io.Socket, state:Data.MouseInput|any):void {
        if(!this.players[socket.id]) return;
        this.players[socket.id].translateMouseInput(state);
    }

    /**
     * Handles keyboard input sent by the client
     * 
     * @param socket The socket.io object of the player
     * @param state The keyboard state given by the player
     */
    handleKeyboardInput(socket:io.Socket, state:Data.KeyboardInput):void {
        if(!this.players[socket.id]) return;
        this.players[socket.id].translateKeyboardInput(state);
    }

    /**
     * Handles chat message input sent by the client
     * 
     * @param sender The socket.io object of the player
     * @param message The message sent by the player
     */
    chatMessage(sender:io.Socket, message:string):void {
        Object.keys(this.sockets).forEach(id => {
            const socket = this.sockets[id];
            socket.emit(constants.msg.chatmessage, {message:striptags(message).slice(0, 300), sender:sender.id});
        });
    }

    /**
     * Updates the entire game state.
     * 
     * @returns A seirialized object designed to be sent to the client
     */
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