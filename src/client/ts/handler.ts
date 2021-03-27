import {processGameUpdate, getCurrentState} from "./state";
import * as serialized from "../../shared/types/serializedData";
import * as chatbox from "./ui/chatbox";

export function handleGameUpdate(update:serialized.World):void {
    processGameUpdate(update);
}

export function handleChatMessage(data:serialized.ChatMessage):void {
    let state:any = getCurrentState();
    let sender:string = "";
    if(data.sender == state.me.id) sender = state.me.username;
    else {
        let senderPlayer:serialized.Player|null = state.others.find((s:{id:any;}) => s.id == data.sender);
        if(senderPlayer) sender = senderPlayer.username;
        else sender = "Spectator";
    }

    chatbox.createMessage(`[${sender}]: ${data.message}`);
}