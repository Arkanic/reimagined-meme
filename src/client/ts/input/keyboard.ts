import * as networking from "../networking";
import * as Data from "../../../shared/types/inputObject";

let keyboardKeys:{[unit:string]:number} = {
    w:87,
    a:65,
    s:83,
    d:68
}
let keys:{[unit:string]:boolean} = {};

function checkChangeKey(e:KeyboardEvent, changeTo:boolean):void {
    for(let key in keyboardKeys) {
        if(keyboardKeys[key] == e.keyCode) {
            keys[key] = changeTo;
            networking.updateKeyboardInput(keys as unknown as Data.KeyboardInput);
            return; // break out of loop
        }
    }
    
}

function handleKeyDown(e:KeyboardEvent):void {
    checkChangeKey(e, true);
}

function handleKeyUp(e:KeyboardEvent):void {
    checkChangeKey(e, false);
}

export function getKeyboardState():{[unit:string]:boolean} {
    return keys;
}

export function startKeyboardInputHandling():void {
    Object.keys(keyboardKeys).forEach((key) => {
        keys[key] = false;
    });

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
}

export function stopKeyboardInputHandling():void {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
}