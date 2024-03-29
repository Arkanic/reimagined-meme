import constants from "../../../../shared/constants";
import * as serialized from "../../../../shared/types/serializedData";
import * as assets from "../../assets";

/**
 * Render a barrel
 * 
 * @param ctx The canvas 2D context
 * @param canvas The canvas element
 * @param me The player
 * @param player The other player
 */
export default function renderBarrel(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement, me:serialized.Player|null, entity:serialized.Entity):void {
    const {x, y} = entity.position;
    const {rotation} = entity;
    const canvasX:number = canvas.width / 2 + x - me!.position.x;
    const canvasY:number = canvas.height / 2 + y - me!.position.y;

    const radius = constants.bodies.barrel.radius;

    ctx.save();
    ctx.translate(canvasX, canvasY);
    ctx.rotate(rotation);
    ctx.drawImage(
        assets.get("./barrel.png"),
        -radius,
        -radius,
        radius * 2,
        radius * 2
    );
    ctx.restore();
}