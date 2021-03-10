import * as mouse from "./input/mouse";

export function startInputHandling():void {
    mouse.startMouseInputHandling();
}

export function stopInputHandling():void {
    mouse.stopMouseInputHandling();
}