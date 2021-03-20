import constants from "../../../../shared/constants";
import * as serialized from "../../../../shared/types/serializedData";
import * as assets from "../../assets";

export default function renderPlayer(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement, me:serialized.Player|null, player:serialized.Player):void {
    const {x, y} = player.position;
    const canvasX:number = canvas.width / 2 + x - me!.position.x;
    const canvasY:number = canvas.height / 2 + y - me!.position.y

    ctx.save();
    ctx.translate(canvasX, canvasY);
    ctx.drawImage(
        assets.get("./test.png"),
        -constants.player.radius,
        -constants.player.radius,
        constants.player.radius * 2,
        constants.player.radius * 2
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
}