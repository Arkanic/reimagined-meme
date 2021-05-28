import * as mouse from "./input/mouse";
import * as keyboard from "./input/keyboard";

/**
 * Start handling input
 */
export function startInputHandling():void {
    mouse.startMouseInputHandling();
    keyboard.startKeyboardInputHandling();
}

/**
 * Stop handling input
 */
export function stopInputHandling():void {
    mouse.stopMouseInputHandling();
    keyboard.stopKeyboardInputHandling();
}