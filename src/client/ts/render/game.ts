import * as state from "../state";
import * as mouse from "../input/mouse";
import * as keyboard from "../input/keyboard";
import * as chatbox from "../ui/chatbox";

let ping:string = chatbox.createMessage("ping");
let keyboardState:string = chatbox.createMessage("keyboard state");
let mouseState:string = chatbox.createMessage("mouse state");
let networkState:string = chatbox.createMessage("network state");

export function render(ctx:CanvasRenderingContext2D):void {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    chatbox.editMessage(ping, `${state.getPing()}`);
    chatbox.editMessage(keyboardState, JSON.stringify(keyboard.getKeyboardState()));
    chatbox.editMessage(mouseState, JSON.stringify(mouse.getMouseState()));
    chatbox.editMessage(networkState, JSON.stringify(state.getCurrentState()));
}