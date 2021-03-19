import {newGameUpdateData, getCurrentState} from "./state";

import * as chatbox from "./ui/chatbox";

export function handleGameUpdate(update:any):void {
    newGameUpdateData(update);
}

export function handleChatMessage(data:any):void {
    let state:any = getCurrentState();
    let sender:string = "";
    console.log(state.others);
    console.log(data.sender);
    if(data.sender == state.me.id) sender = state.me.username;
    else {
        let senderPlayer:any|null = state.others.find((s:{id:any;}) => s.id == data.sender);
        if(senderPlayer) sender = senderPlayer.username;
        else sender = "Spectator";
    }

    chatbox.createMessage(`[${sender}]: ${data.message}`);
}