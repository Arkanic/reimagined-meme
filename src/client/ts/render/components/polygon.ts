import constants from "../../../../shared/constants";
import * as serialized from "../../../../shared/types/serializedData";
import * as assets from "../../assets";

import {quickDecomp, makeCCW} from "poly-decomp-es";

const colours:{[unit:string]:{fill:string, border:string}} = {
    ground: {
        fill: "#2b1607",
        border: "#4f2b0c"
    },
    dirt: {
        fill: "#6e2c00",
        border: "#ba4a00",
    },
    polygon: {
        fill: "#cccccc",
        border: "#eeeeee"
    }
}

let polygons:{[unit:string]:number[][][]} = {};

function decomp(verts:Array<{x:number, y:number}>) {
    let arrVerts:Array<Array<number>> = [];
    for(let i in verts) {
        let vert = verts[i];
        arrVerts.push([vert.x, vert.y]);
    }

    makeCCW(arrVerts as any);
    return quickDecomp(arrVerts as any);
}


export default function renderPolygon(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement, me:serialized.Player|null, entity:serialized.Polygon, type:string):void {
    const {x, y} = entity.position;
    const {rotation, vertices, id} = entity;
    const canvasX:number = canvas.width / 2 + x - me!.position.x;
    const canvasY:number = canvas.height / 2 + y - me!.position.y;

    ctx.save();
    ctx.translate(canvasX, canvasY);
    ctx.rotate(rotation);

    ctx.fillStyle = colours[type].fill;
    let shapes;
    if(polygons[id]) shapes = polygons[id];
    else {
        shapes = decomp(vertices);
        polygons[id] = shapes;
    }

    // draw shape segments (decomposed to draw concave shapes)
    for(let i in shapes) {
        let shape = shapes[i];

        ctx.beginPath();
        ctx.moveTo(shape[0][0], shape[0][1])
        for(let i = 1; i < shape.length; i++) {
            let vert = shape[i];
            ctx.lineTo(vert[0], vert[1]);
        }
        ctx.closePath();
        ctx.fill();
    }

    // draw outline of shape
    ctx.strokeStyle = colours[type].border;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y)
    for(let i = 1; i < vertices.length; i++) {
        let vert = vertices[i];
        ctx.lineTo(vert.x, vert.y);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = "red";
    ctx.fillRect(-5, -5, 10, 10);

    ctx.restore();

    /*
    ctx.fillStyle = "green";
    ctx.fillRect(vertices[0].x - 5, vertices[0].y - 5, 10, 10);

    for(let i = 1; i < vertices.length; i++) {
        let pos = vertices[i];
        ctx.fillRect(pos.x - 5, pos.y - 5, 10, 10);
    }

    ctx.restore();*/
}