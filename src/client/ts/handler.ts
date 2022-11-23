import {processInitData, processGameUpdate, getCurrentState} from "./state";
import * as serialized from "../../shared/types/serializedData";
import * as chatbox from "./ui/chatbox";
import * as game from "./render/game";
import * as render from "./render";
import * as skimmer from "../../shared/utils/skim";

/**
 * Handle a new game update from the server
 * 
 * @param update The update
 */

let world:{[unit:string]:any} = {
    time:0,
    me:null,
    others:[],
    entities:[]
};

function fattenWorldSkim(update:serialized.WorldSkim, then:{[unit:string]:any}):serialized.World {
    let copied = Object.assign({}, then);
    copied.others = skimmer.fattenSkim(update.others, then.others);
    copied.entities = skimmer.fattenSkim(update.entities, then.entities);
    copied.time = update.time;
    copied.me = update.me;

    return copied as unknown as any as serialized.World;
}

export function handleGameUpdate(update:serialized.WorldSkim):void {
    let fullWorld = fattenWorldSkim(update, world);

    if(fullWorld.me) processGameUpdate(fullWorld);

    world = fullWorld;
}

/**
 * Handle init data from the server
 * 
 * @param data InitData
 */
export function handleInitData(data:serialized.InitData):void {
    processInitData(data);
}

/**
 * Handle a chat message from the server
 * 
 * @param data The serialized chat message
 */
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