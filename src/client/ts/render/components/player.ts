import constants from "../../../../shared/constants";
import * as serialized from "../../../../shared/types/serializedData";
import * as assets from "../../assets";

/**
 * Render a player
 * 
 * @param ctx The canvas 2D context
 * @param canvas The canvas element
 * @param me The player
 * @param player The other player
 */
export default function renderPlayer(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement, me:serialized.Player|null, player:serialized.Player):void {
    const {x, y} = player.position;
    const {rotation, username} = player;
    const canvasX:number = canvas.width / 2 + x - me!.position.x;
    const canvasY:number = canvas.height / 2 + y - me!.position.y

    ctx.save();
    ctx.translate(canvasX, canvasY);
    ctx.rotate(rotation);
    ctx.drawImage(
        assets.get("./player.png"),
        -constants.player.radius - 4,
        -constants.player.radius - 4,
        constants.player.radius * 2 + 4,
        constants.player.radius * 2 + 4
    );
    ctx.restore();

    ctx.fillStyle = "white";
    ctx.fillRect(
        canvasX - constants.player.radius,
        canvasY + constants.player.radius + 8,
        constants.player.radius * 2,
        2
    );
    ctx.fillStyle = "red";
    ctx.fillRect(
        canvasX - constants.player.radius + constants.player.radius * 2 * player.health / constants.player.defaultHealth,
        canvasY + constants.player.radius + 8,
        constants.player.radius * 2 * (1 - player.health / constants.player.defaultHealth),
        2
    );

    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(username, canvasX, canvasY + constants.player.radius + 24);
}