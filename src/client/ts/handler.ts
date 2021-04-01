import {processGameUpdate, getCurrentState} from "./state";
import * as serialized from "../../shared/types/serializedData";
import * as chatbox from "./ui/chatbox";
import * as game from "./render/game";
import * as render from "./render";

export function handleGameUpdate(update:serialized.World):void {
    processGameUpdate(update);
}

export function handleChatMessage(data:serialized.ChatMessage):void {
    let state:serialized.World = getCurrentState();
    let sender:serialized.Player|undefined;

    if(state.me.id == data.sender) sender = state.me;
    else {
        sender = state.others.find(p => p.id == data.sender);
    }
    
    let senderName:string = sender?.username || "Spectator";
    chatbox.createMessage(`[${senderName}]: ${data.message}`);
    game.addChatMessage(sender, data.message);
}