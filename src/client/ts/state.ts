/* may contain some sort of interpolation in the future */

let currentUpdate:any;
let ping:number = 0;

export function newGameUpdateData(update:any) {
    currentUpdate = update;
    ping = update.time - Date.now();
}
export function getCurrentState():any {
    return currentUpdate;
}

export function getPing():number {
    return ping;
}