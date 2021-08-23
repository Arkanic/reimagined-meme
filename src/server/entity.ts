import {Body, Bodies} from "matter-js";

import Vector2 from "./types/vector2";
import * as Serialized from "../shared/types/serializedData";
import constants from "../shared/constants";
import sqrt from "../shared/utils/sqrt";

abstract class Entity {
    id:string;

    velocity:Vector2;
    maxSpeed:number;

    body:Body;

    drawName:string;

    constructor(id:string, position:Vector2, maxSpeed:number, drawName:string) {
        this.id = id;

        this.velocity = new Vector2(0, 0);
        this.maxSpeed = maxSpeed;

        this.body = Bodies.circle(position.x, position.y, 32);

        this.drawName = drawName;
    }

    /**
     * Update the current entity.
     */
    update():void {
    }

    /**
     * Modifies velocity based on a delta parameter given.
     * 
     * @param delta The change in velocity
     */
    modifyVelocity(delta:Vector2):void {
        let tVelocity = this.velocity;
        tVelocity.equals(delta);
        tVelocity.x = Math.max(Math.min(tVelocity.x, constants.player.maxSpeed), -constants.player.maxSpeed);
        tVelocity.y = Math.max(Math.min(tVelocity.y, constants.player.maxSpeed), -constants.player.maxSpeed);
        this.velocity = tVelocity;

        Body.setVelocity(this.body, tVelocity);
    }

    /**
     * Returns the distance between self and another object using pythagorean theorem.
     * 
     * @param object The object being compared to
     */
    distanceTo(object:Entity):number {
        let temp = new Vector2(
            this.body.position.x - object.body.position.x,
            this.body.position.y - object.body.position.y
        );
        return sqrt(temp.x * temp.x + temp.y * temp.y);
    }

    /**
     * Returns a serialized version of `this`. Used for sending information to client.
     * 
     * @returns A serialized version of `this`, with only whitelisted parameters.
     */
    serialize():Serialized.Entity {
        return {
            id: this.id,
            rotation: this.body.angle,
            position: this.body.position,
            velocity: this.body.velocity,
            drawName: this.drawName
        }
    }
}

export default Entity;