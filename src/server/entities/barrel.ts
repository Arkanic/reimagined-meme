import {Bodies} from "matter-js";

import Entity from "./entity";
import Vector2 from "../types/vector2";
import constants from "../../shared/constants";

class Barrel extends Entity {
    constructor(id:string, position:Vector2) {
        super(id, position, 3, "barrel");

        this.body = Bodies.circle(position.x, position.y, constants.bodies.barrel.radius, {
            isStatic:true
        });
    }
}

export default Barrel;