import * as state from "../state";
import * as mouse from "../input/mouse";
import * as keyboard from "../input/keyboard";

export function render(ctx:CanvasRenderingContext2D):void {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // ping
    ctx.fillStyle = "black";
    ctx.font = "16px sans-serif";
    ctx.fillText(`${state.getPing()}`, 10, 30);
    ctx.fillText(`${JSON.stringify(keyboard.getKeyboardState())}`, 10, 60);
    ctx.fillText(`${JSON.stringify(mouse.getMouseState())}`, 10, 90);
    ctx.fillText(`${JSON.stringify(state.getCurrentState())}`, 10, 120);
}