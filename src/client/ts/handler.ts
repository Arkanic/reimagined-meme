import {newGameUpdateData} from "./state";

export function handleGameUpdate(update:any):void {
    newGameUpdateData(update);
}