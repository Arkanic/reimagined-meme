import * as serialized from "../../shared/types/serializedData";

/* may contain some sort of interpolation in the future */

let currentUpdate:serialized.World;
let ping:number = 0;

export function newGameUpdateData(update:serialized.World) {
    currentUpdate = update;
    ping = Date.now() - update.time;
}
export function getCurrentState():serialized.World {
    return currentUpdate;
}

export function getPing():number {
    return ping;
}