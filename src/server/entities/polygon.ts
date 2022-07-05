import {Bodies} from "matter-js";
import Entity from "./entity";
import Vector2 from "../types/vector2";
import constants from "../../shared/constants";

class Ground extends Entity {
    constructor(id:string, position:Vector2) {
        super(id, position, 0, "polygon");

        this.body = Bodies.polygon(position.x, position.y, 10, constants.bodies.ground.radius, {
            isStatic: true
        });
    }
}

export default Ground;