import {debounce} from "throttle-debounce";

import * as state from "./state";
import * as menu from "./render/menu";
import * as game from "./render/game";
import * as mouse from "./input/mouse";
import * as keyboard from "./input/keyboard";
import * as chatbox from "./ui/chatbox";

import bob from "../assets/test.png";

let keyboardMessage:string = chatbox.createMessage("keyboard data");
setInterval(() => {
    chatbox.editMessage(keyboardMessage, JSON.stringify(keyboard.getKeyboardState()));
}, 60/1000)

let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game")!;
let ctx = canvas.getContext("2d")!;

ctx.font = "10px Arial";
ctx.textAlign = "center";

/**
 * Sets the canvas dimensions based on current width and height
 */
function setDimensions():void {
    const scaleRatio = Math.max(1, 800 / window.innerWidth);
    canvas.width = scaleRatio * window.innerWidth;
    canvas.height = scaleRatio * window.innerHeight;
}
setDimensions();

window.addEventListener("resize", debounce(40, setDimensions));

let renderLoop = setInterval(() => {
    menu.render(ctx, canvas);
}, 1000/60);

/**
 * Start the render loop, stop menu loop
 */
export function startRendering() {
    clearInterval(renderLoop);
    renderLoop = setInterval(() => {
        game.render(ctx, canvas);
    }, 1000/60);
}

/**
 * Stop the render loop, start menu loop
 */
export function stopRendering() {
    clearInterval(renderLoop);
    renderLoop = setInterval(() => {
        menu.render(ctx, canvas);
    }, 1000/60);
}