import Vector2 from "./types/vector2";
import * as Serialized from "../shared/types/serializedData";
import constants from "../shared/constants";

class Entity {
    id:string;

    position:Vector2;
    velocity:Vector2;
    maxSpeed:number;

    constructor(id:string, position:Vector2, maxSpeed:number) {
        this.id = id;

        this.position = position;
        this.velocity = new Vector2(0, 0);
        this.maxSpeed = maxSpeed;
    }

    update():void {
        this.position.add(this.velocity);
        this.position.x = Math.max(Math.min(this.position.x, constants.map.size), 0);
        this.position.y = Math.max(Math.min(this.position.y, constants.map.size), 0);
        this.velocity.x *= 0.8;
        this.velocity.y *= 0.8;
    }

    modifyVelocity(delta:Vector2):void {
        let tVelocity = this.velocity;
        tVelocity.equals(delta);
        tVelocity.x = Math.max(Math.min(tVelocity.x, constants.player.maxSpeed), -constants.player.maxSpeed);
        tVelocity.y = Math.max(Math.min(tVelocity.y, constants.player.maxSpeed), -constants.player.maxSpeed);
        this.velocity = tVelocity;
    }

    distanceTo(object:{position:Vector2}):number {
        let temp = new Vector2(
            this.position.x - object.position.x,
            this.position.y - object.position.y
        );
        return Math.sqrt(temp.x * temp.x + temp.y * temp.y);
    }

    serialize():Serialized.Entity {
        return {
            id: this.id,
            position: {
                x: this.position.x,
                y: this.position.y
            },
            velocity: {
                x: this.velocity.x,
                y: this.velocity.y
            }
        }
    }
}

export default Entity;