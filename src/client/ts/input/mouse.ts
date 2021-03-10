class MouseState {
    x:number;
    y:number;
    clicked:boolean;

    constructor() {
        this.x = window.innerWidth/2;
        this.y = window.innerHeight/2;
        this.clicked = false;
    }

    handleMouseMove(e:MouseEvent):void {
        mouseState.x = e.offsetX;
        mouseState.y = e.offsetY;
    }

    handleMouseDown(e:MouseEvent):void {
        mouseState.clicked = true;
    }

    handleMouseUp(e:MouseEvent):void {
        mouseState.clicked = false;
    }
}
let mouseState:MouseState = new MouseState();

export function getMouseState():MouseState {
    return mouseState;
}

export function startMouseInputHandling():void {
    window.addEventListener("mousemove", mouseState.handleMouseMove);
    window.addEventListener("mousedown", mouseState.handleMouseDown);
    window.addEventListener("mouseup", mouseState.handleMouseUp);
}

export function stopMouseInputHandling():void {
    window.removeEventListener("mousemove", mouseState.handleMouseMove);
    window.removeEventListener("mousedown", mouseState.handleMouseDown);
    window.removeEventListener("mouseup", mouseState.handleMouseUp);
}