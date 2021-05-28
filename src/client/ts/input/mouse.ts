import * as networking from "../networking";
import * as Data from "../../../shared/types/inputObject";

let mouse:Data.MouseInput;

/**
 * Handle mouse move
 * 
 * @param e The event
 */
function handleMouseMove(e:MouseEvent):void {
    mouse.mouseX = e.offsetX;
    mouse.mouseY = e.offsetY;

    networking.updateMouseInput(mouse);
}

/**
 * Handle mouse down
 * 
 * @param e The event
 */
function handleMouseDown(e:MouseEvent):void {
    mouse.clicking = true;

    networking.updateMouseInput(mouse);
}

/**
 * Handle mouse up
 * 
 * @param e The event
 */
function handleMouseUp(e:MouseEvent):void {
    mouse.clicking = false;

    networking.updateMouseInput(mouse);
}

/**
 * Get current mouse state
 */
export function getMouseState():Data.MouseInput {
    return mouse;
}

/**
 * Start handling mouse input
 */
export function startMouseInputHandling():void {
    mouse = {
        mouseX:window.innerWidth/2,
        mouseY:window.innerHeight/2,
        clicking:false
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
}

/**
 * Stop handling mouse input
 */
export function stopMouseInputHandling():void {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mouseup", handleMouseUp);
}