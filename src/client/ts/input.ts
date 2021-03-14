import * as mouse from "./input/mouse";
import * as keyboard from "./input/keyboard";

export function startInputHandling():void {
    mouse.startMouseInputHandling();
    keyboard.startKeyboardInputHandling();
}

export function stopInputHandling():void {
    mouse.stopMouseInputHandling();
    keyboard.stopKeyboardInputHandling();
}