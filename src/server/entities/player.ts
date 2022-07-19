import {Bodies, Body} from "matter-js";

import constants from "../../shared/constants";

import Entity from "./entity";
import Vector2 from "../types/vector2";
import * as Data from "../../shared/types/inputObject";
import * as Serialized from "../../shared/types/serializedData";

class Player extends Entity {
    username:string;
    health:number;
    screen:Vector2;
    clicking:boolean;
    keys:Data.KeyboardInput

    constructor(id:string, position:Vector2, screen:Vector2, username:string) {
        super(id, position, constants.player.maxSpeed, "player");

        this.screen = screen;

        this.username = username;
        this.health = constants.player.defaultHealth;

        this.clicking = false;
        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false
        }

        this.body = Bodies.circle(position.x, position.y, constants.player.radius, {
            inertia: Infinity
        });
    }

    update() {
        super.update();

        let delta = new Vector2(0, 0);
        let speed = constants.player.speed;
        if(this.keys.w) delta.y -= speed;
        if(this.keys.a) delta.x -= speed;
        if(this.keys.s) delta.y += speed;
        if(this.keys.d) delta.x += speed;

        this.modifyVelocity(delta);
    }

    /**
     * Translates client mouse data into usable information.
     * 
     * @param state The mouse state
     */
    translateMouseInput(state:Data.MouseInput):void { 
        this.clicking = state.clicking;

        Body.setAngle(this.body, Math.atan2(state.mouseY - this.screen.y / 2, state.mouseX - this.screen.x / 2));
    }

    /**
     * Translates client keyboard data into usable information.
     * 
     * @param state The keyboard state
     */
    translateKeyboardInput(state:Data.KeyboardInput):void {
        this.keys = state;
    }

    serialize():Serialized.Player {
        return {
            ...(super.serialize()),
            username: this.username,
            health: this.health
        }
    }
}

export default Player;