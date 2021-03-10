/* may contain some sort of interpolation in the future */

let currentUpdate:any;

export function newGameUpdateData(update:any) {
    currentUpdate = update;
}
export function getCurrentState():any {
    return currentUpdate;
}