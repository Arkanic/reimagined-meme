import {Bodies} from "matter-js";

import Entity from "./entity";
import Vector2 from "./types/vector2";

class Wall extends Entity {
    constructor(id:string, position:Vector2, size:Vector2) {
        super(id, position, 0, "wall");

        this.body = Bodies.rectangle(position.x, position.y, size.x, size.y, {
            isStatic: true
        });
    }
}

export default Wall;