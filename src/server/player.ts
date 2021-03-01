import constants from "../shared/constants";

import Entity from "./entity";
import Vector2 from "./types/vector2";
import InputObject from "./types/inputObject";

class Player extends Entity {
    username:string;
    health:number;

    constructor(id:string, position:Vector2, username:string) {
        super(id, position, constants.player.maxSpeed);

        this.username = username;
        this.health = constants.player.defaultHealth;
    }

    translateInput(state:InputObject):void {
        let delta = new Vector2(0, 0);
        let speed = constants.player.speed;
        if(state.keys.w) delta.y -= speed;
        if(state.keys.a) delta.x -= speed;
        if(state.keys.s) delta.y += speed;
        if(state.keys.d) delta.x += speed;
        this.modifyVelocity(delta);
    }

    serialize() {
        return {
            ...(super.serialize()),
            username: this.username,
            health: this.health
        }
    }
}

export default Player;