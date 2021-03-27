import constants from "../shared/constants";

import Entity from "./entity";
import Vector2 from "./types/vector2";
import * as Data from "../shared/types/inputObject";
import * as Serialized from "../shared/types/serializedData";

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

    translateMouseInput(state:Data.MouseInput):void {
        
    }

    translateKeyboardInput(state:Data.KeyboardInput):void {
        let delta = new Vector2(0, 0);
        let speed = constants.player.speed;
        if(state.w) delta.y -= speed;
        if(state.a) delta.x -= speed;
        if(state.s) delta.y += speed;
        if(state.d) delta.x += speed;
        super.modifyVelocity(delta);
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