import {debounce} from "throttle-debounce";

import * as state from "./state";
import * as background from "./render/background";
import * as game from "./render/game";
import * as mouse from "./input/mouse";
import * as keyboard from "./input/keyboard";

import bob from "../assets/test.png";

let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game")!;
let ctx = canvas.getContext("2d")!;

ctx.font = "10px Arial";
ctx.textAlign = "center";

function setDimensions():void {
    const scaleRatio = Math.max(1, 800 / window.innerWidth);
    canvas.width = scaleRatio * window.innerWidth;
    canvas.height = scaleRatio * window.innerHeight;
}
setDimensions();

window.addEventListener("resize", debounce(40, setDimensions));

let renderLoop = setInterval(() => {
    background.render(ctx);
}, 1000/60);

export function startRendering() {
    clearInterval(renderLoop);
    renderLoop = setInterval(() => {
        game.render(ctx);
    }, 1000/60);
}
export function stopRendering() {
    clearInterval(renderLoop);
    renderLoop = setInterval(() => {
        background.render(ctx);
    }, 1000/60);
}