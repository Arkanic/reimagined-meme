import Polygon from "./polygon";
import Vector2 from "../types/vector2";
import Matter, {Bodies} from "matter-js";

class Ground extends Polygon {
    constructor(id:string, position:Vector2, vertices:{x:number, y:number}[]) {
        super(id, position, vertices, "ground");
        if(!this.broken) this.body.collisionFilter = {
            group: -1,
            category: 2,
            mask: 0
        }
    }
}

export default Ground;