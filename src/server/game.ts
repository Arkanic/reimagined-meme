import io from "socket.io";
import striptags from "striptags";
import {Engine, World, Composite, Bodies} from "matter-js";
import {nanoid} from "nanoid";

import Entity from "./entity";
import Player from "./player";
import Wall from "./wall";
import Vector2 from "./types/vector2";
import * as Data from "../shared/types/inputObject";
import * as Serialized from "../shared/types/serializedData";

import constants from "../shared/constants";

class Game {
    sockets:{[key:string]:io.Socket};
    players:{[key:string]:Player};
    entities:{[key:string]:Entity};

    engine:Engine;
    then:number;
    now:number;

    constructor() {
        this.sockets = {};
        this.players = {};
        this.entities = {};

        this.engine = Engine.create();
        this.engine.world.gravity.y = 0;

        let topWall = new Wall(nanoid(),
            new Vector2(constants.map.size / 2, -16),
            new Vector2(constants.map.size, 32)
        );
        this.addEntity(topWall);
        let rightWall = new Wall(nanoid(),
            new Vector2(constants.map.size + 16, constants.map.size / 2),
            new Vector2(32, constants.map.size)
        );
        this.addEntity(rightWall);
        let bottomWall = new Wall(nanoid(),
            new Vector2(constants.map.size / 2, constants.map.size + 16),
            new Vector2(constants.map.size, 32)
        );
        this.addEntity(bottomWall);
        let leftWall = new Wall(nanoid(),
            new Vector2(-16, constants.map.size / 2),
            new Vector2(32, constants.map.size)
        );
        this.addEntity(leftWall);

        this.then = Date.now();
        this.now = 0;

        setInterval(this.update.bind(this), 10); // .bind() makes it run on the local scope, rather than having update() run on the default values for the class
    }

    /**
     * Add an entity to the game, and handle matter-js bindings.
     * 
     * @param entity The object to be bound & created
     */
    addEntity(entity:Entity):void {
        this.entities[entity.id] = entity;
        World.addBody(this.engine.world, entity.body);
    }

    /**
     * Remove entity from the game, and handle matter-js bindings.
     * 
     * @param id The entities' id.
     */
    removeEntity(id:string):void {
        World.remove(this.engine.world, this.entities[id].body);
        delete this.entities[id];
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

        World.add(this.engine.world, [this.players[socket.id].body]);
    }

    /**
     * Removes a player from the game object
     * 
     * @param socket The socket.io object of the player
     */
    removePlayer(socket:io.Socket):void {
        World.remove(this.engine.world, this.players[socket.id].body);

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
        this.now = Date.now();
        let dt = this.now - this.then;
        
        Engine.update(this.engine, dt);

        Object.keys(this.sockets).forEach(id => {
            const socket = this.sockets[id];
            const player = this.players[id];

            player.update();

            socket.emit(constants.msg.update, this.createUpdate(player));
        });

        this.then = this.now;
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