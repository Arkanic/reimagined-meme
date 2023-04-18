import Polygon from "./polygon";
import Vector2 from "../types/vector2";

class Dirt extends Polygon {
    constructor(id:string, position:Vector2, vertices:{x:number, y:number}[]) {
        super(id, position, vertices, "dirt");
    }
}

export default Dirt;