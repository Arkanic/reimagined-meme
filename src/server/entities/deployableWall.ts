import {Bodies, Body} from "matter-js";

import Entity from "./entity";
import Vector2 from "../types/vector2";
import constants from "../../shared/constants";

class DeployableWall extends Entity {
    constructor(id:string, position:Vector2) {
        super(id, position, 1, "deployable_wall");

        let {width, height} = constants.bodies.deployableWall;
        this.body = Bodies.rectangle(position.x, position.y, width, height, {
            friction: 100
        });
        Body.setMass(this.body, 1000);
        Body.setDensity(this.body, 0.5);
    }
}

export default DeployableWall;