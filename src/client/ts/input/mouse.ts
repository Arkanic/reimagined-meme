interface MouseState {
    x:number;
    y:number;
    clicked:boolean;
}

let mouse:MouseState;

function handleMouseMove(e:MouseEvent):void {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
}

function handleMouseDown(e:MouseEvent):void {
    mouse.clicked = true;
}

function handleMouseUp(e:MouseEvent):void {
    mouse.clicked = false;
}

export function getMouseState():MouseState {
    return mouse;
}

export function startMouseInputHandling():void {
    mouse = {
        x:window.innerWidth/2,
        y:window.innerHeight/2,
        clicked:false
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
}

export function stopMouseInputHandling():void {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mouseup", handleMouseUp);
}