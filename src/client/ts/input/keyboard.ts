import * as networking from "../networking";
import * as Data from "../../../shared/types/inputObject";

let keyboardKeys:{[unit:string]:number} = {
    w:87,
    a:65,
    s:83,
    d:68
}
let keys:{[unit:string]:boolean} = {};

/**
 * Check which key caused the event, and map it to the keyboard keys
 */
function checkChangeKey(e:KeyboardEvent, changeTo:boolean):void {
    for(let key in keyboardKeys) {
        if(keyboardKeys[key] == e.keyCode) {
            keys[key] = changeTo;
            networking.updateKeyboardInput(keys as unknown as Data.KeyboardInput);
            return; // break out of loop
        }
    }
    
}

/**
 * Handle key down
 * 
 * @param e The event
 */
function handleKeyDown(e:KeyboardEvent):void {
    checkChangeKey(e, true);
}

/**
 * Handle key up
 * 
 * @param e The event
 */
function handleKeyUp(e:KeyboardEvent):void {
    checkChangeKey(e, false);
}

/**
 * Get the current keyboard state
 */
export function getKeyboardState():{[unit:string]:boolean} {
    return keys;
}


let interval:NodeJS.Timeout;

/**
 * Start handling keyboard input
 */
export function startKeyboardInputHandling():void {
    Object.keys(keyboardKeys).forEach((key) => {
        keys[key] = false;
    });

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    interval = setInterval(() => {
        networking.updateKeyboardInput(keys as unknown as Data.KeyboardInput);
    });
}

/**
 * Stop handling keyboard input
 */
export function stopKeyboardInputHandling():void {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);

    clearInterval(interval);
}