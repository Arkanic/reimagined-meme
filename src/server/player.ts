import constants from "../shared/constants";

import Entity from "./entity";
import Vector2 from "./types/vector2";
import * as Data from "../shared/types/inputObject";

class Player extends Entity {
    username:string;
    health:number;
    screen:Vector2;

    constructor(id:string, position:Vector2, screen:Vector2, username:string) {
        super(id, position, constants.player.maxSpeed);

        this.screen = screen;

        this.username = username;
        this.health = constants.player.defaultHealth;
    }

    translateInput(state:Data.Input):void {
        let delta = new Vector2(0, 0);
        let speed = constants.player.speed;
        if(state.keys.w) delta.y -= speed;
        if(state.keys.a) delta.x -= speed;
        if(state.keys.s) delta.y += speed;
        if(state.keys.d) delta.x += speed;
        super.modifyVelocity(delta);
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