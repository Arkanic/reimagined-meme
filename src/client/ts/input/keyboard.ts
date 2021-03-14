let keyboardKeys:{[unit:string]:number} = {
    up:87,
    left:65,
    down:83,
    right:68
}
let keys:{[unit:string]:boolean} = {};

function checkChangeKey(e:KeyboardEvent, changeTo:boolean):void {
    for(let key in keyboardKeys) {
        if(keyboardKeys[key] == e.keyCode) {
            keys[key] = changeTo;
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