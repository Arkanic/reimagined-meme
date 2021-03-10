import {getCurrentState, getPing} from "./state";
import * as background from "./render/background";

import bob from "../assets/test.png";

let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game")!;
let ctx = canvas.getContext("2d")!;

export function setup():Promise<void> { // promise is just to keep it as a setup method
    function fullWidthResize(element:HTMLCanvasElement):void {
        element.width = window.innerWidth;
        element.height = window.innerHeight;
    }
    fullWidthResize(canvas); // execute on setup
    window.addEventListener("resize", () => {
        fullWidthResize(canvas);
    }, false);


    // settings //
    //(nothing)


    return new Promise(resolve => {
        resolve();
    });
}

function render():void {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // ping
    ctx.fillStyle = "black";
    ctx.font = "16px sans-serif";
    ctx.fillText(`${getPing()}`, 10, 30);
}


let renderLoop = setInterval(() => {
    background.render(ctx);
}, 1000/60);

export function startRendering() {
    clearInterval(renderLoop);
    renderLoop = setInterval(render, 1000/60);
}
export function stopRendering() {
    clearInterval(renderLoop);
    renderLoop = setInterval(() => {
        background.render(ctx);
    }, 1000/60);
}