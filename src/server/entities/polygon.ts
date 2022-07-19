import Matter, {Bodies} from "matter-js";
import Entity from "./entity";
import Vector2 from "../types/vector2";
import * as Serialized from "../../shared/types/serializedData";

function topLeftVert(verts:Array<{x:number, y:number}>):{x:number, y:number} {
    let topLeft = {x:Infinity, y:Infinity};
    let smallestY = Infinity;
    for(let i in verts) {
        let vert = verts[i];

        if(vert.y < smallestY) smallestY = vert.y;

    }

    let smallestYs = verts.filter((x) => x.y === smallestY);
    if(smallestYs.length === 1) return smallestYs[0];

    let smallestX = Infinity;
    for(let i in smallestYs) {
        if(smallestYs[i].x < smallestX) smallestX = smallestYs[i].x;
    }

    return smallestYs.filter((x) => x.x === smallestX)[0];
}

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
        let localVert = topLeftVert(this.localVertices);
        let bodyVert = topLeftVert(this.body.vertices);
        let diff = {
            x: localVert.x - bodyVert.x + this.body.position.x,
            y: localVert.y - bodyVert.y + this.body.position.y
        }
        for(let i in this.localVertices) {
            let v = this.localVertices[i];
            verts.push({
                x: v.x - diff.x,
                y: v.y - diff.y
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