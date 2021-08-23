import constants from "../../../../shared/constants";
import * as serialized from "../../../../shared/types/serializedData";

import ChatBubble from "../../../types/chatBubble";

/**
 * Render a chat bubble
 * 
 * @param ctx The canvas 2D context
 * @param canvas The canvas element
 * @param me The player
 * @param chatBubbleMeta The metadata of the chat bubble
 */
export default function renderChatBubble(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement, me:serialized.Player|null, chatBubbleMeta:ChatBubble):void {
    const {x, y, message} = chatBubbleMeta;
    const canvasX:number = canvas.width / 2 + x - me!.position.x;
    const canvasY:number = canvas.height / 2 + y - me!.position.y;

    ctx.save();
    ctx.translate(canvasX, canvasY);
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText(message, 0, 0);
    ctx.restore();
}