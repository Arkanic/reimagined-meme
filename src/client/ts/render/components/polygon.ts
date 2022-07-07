import constants from "../../../../shared/constants";
import * as serialized from "../../../../shared/types/serializedData";
import * as assets from "../../assets";


export default function renderPolygon(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement, me:serialized.Player|null, entity:serialized.Polygon):void {
    const {x, y} = entity.position;
    const {rotation, vertices} = entity;
    const canvasX:number = canvas.width / 2 + x - me!.position.x;
    const canvasY:number = canvas.height / 2 + y - me!.position.y;

    ctx.save();
    ctx.translate(canvasX, canvasY);
    ctx.rotate(rotation);

    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);

    for(let i = 1; i < vertices.length; i++) {
        let pos = vertices[i];
        ctx.lineTo(pos.x, pos.y);
    }

    ctx.closePath();
    ctx.fill();

    ctx.restore();
}