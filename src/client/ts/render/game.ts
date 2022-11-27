import {nanoid} from "nanoid";

import * as state from "../state";
import * as serialized from "../../../shared/types/serializedData";
import constants from "../../../shared/constants";

import renderBackground from "./components/background";
import renderPlayer from "./components/player";
import renderBarrel from "./components/barrel";
import renderPolygon from "./components/polygon";
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
    const {staticEntities} = state.getInitData();
    if(!me) return; // if dead

    renderBackground(ctx, canvas, me.position.x, me.position.y);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(canvas.width / 2 - me.position.x, canvas.height / 2 - me.position.y, constants.map.size, constants.map.size);

    staticEntities.forEach((e) => {
        switch(e.drawName) {
            case "ground":
            case "dirt":
                renderPolygon(ctx, canvas, me, e as serialized.Polygon);
                break;
        }
    });

    entities.forEach((e) => {
        switch(e.drawName) {
            case "ground":
                renderPolygon(ctx, canvas, me, e as serialized.Polygon);
                break;
            case "barrel":
                renderBarrel(ctx, canvas, me, e);
                break;
            case "polygon":
                renderPolygon(ctx, canvas, me, e as serialized.Polygon);
                break;
        }
    });

    // render dirt ontop of ground
    entities.forEach((e) => {
        switch(e.drawName) {
            case "dirt":
                renderPolygon(ctx, canvas, me, e as serialized.Polygon);
        }
    });

    
    renderPlayer(ctx, canvas, me, me);
    others.forEach((p) => {renderPlayer(ctx, canvas, me, p)});

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