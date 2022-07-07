import Matter, {Bodies} from "matter-js";
import Entity from "./entity";
import Vector2 from "../types/vector2";
import constants from "../../shared/constants";
import * as Serialized from "../../shared/types/serializedData";

class Polygon extends Entity {
    localVertices:{x:number, y:number}[]

    constructor(id:string, position:Vector2, vertices:{x:number, y:number}[]) {
        super(id, position, 0, "polygon");
        this.localVertices = vertices;

        this.body = Bodies.fromVertices(position.x, position.y, this.localVertices as unknown as Matter.Vector[][], {
            isStatic: true
        });
    }

    sandlVertices():Array<{x:number, y:number}> {
        let verts = [];
        for(let i in this.body.vertices) {
            let v = this.body.vertices[i];
            verts.push({
                x: v.x - this.body.position.x,
                y: v.y - this.body.position.y
            });
        }

        return verts;
    }

    serialize():Serialized.Polygon {
        return {
            ...(super.serialize()),
            vertices: this.sandlVertices()
        }
    }
}

export default Polygon;