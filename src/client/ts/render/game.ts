import {nanoid} from "nanoid";

import * as state from "../state";
import * as assets from "../assets";
import * as serialized from "../../../shared/types/serializedData";
import constants from "../../../shared/constants";

import renderBackground from "./components/background";
import renderPlayer from "./components/player";
import renderBarrel from "./components/barrel";
import renderDeployableWall from "./components/deployableWall";
import renderChatbubble from "./components/chatbubble";

import ChatBubble from "../../types/chatBubble";

let chatBubbles:{[unit:string]:ChatBubble} = {};

/**
 * Render the game
 * 
 * @param ctx The canvas 2D context
 * @param canvas The canvas element
 */
export function render(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement):void {
    const {me, others, entities} = state.getCurrentState();
    if(!me) return; // if dead

    renderBackground(ctx, canvas, me.position.x, me.position.y);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(canvas.width / 2 - me.position.x, canvas.height / 2 - me.position.y, constants.map.size, constants.map.size);

    renderPlayer(ctx, canvas, me, me);
    others.forEach((p) => {renderPlayer(ctx, canvas, me, p)});
    entities.forEach((e) => {
        switch(e.drawName) {
            case "barrel":
                renderBarrel(ctx, canvas, me, e);
                break;
            case "deployable_wall":
                renderDeployableWall(ctx, canvas, me, e);
                break;
        }
    });

    for(let i in chatBubbles) renderChatbubble(ctx, canvas, me, chatBubbles[i]);
}

/**
 * Add a chat message to the chatbox
 * 
 * @param sender The message sender
 * @param message The message content
 */
export function addChatMessage(sender:serialized.Player|undefined, message:string):void {
    if(!sender) return;
    let player:serialized.Player = sender!;

    let chatBubbleId = nanoid();
    chatBubbles[chatBubbleId] = {
        x:sender.position.x,
        y:sender.position.y - 20,
        message
    };
    setTimeout(() => {
        delete chatBubbles[chatBubbleId];
    }, constants.game.chatBubbleLifetime);
}