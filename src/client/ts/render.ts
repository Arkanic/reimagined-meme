import {getCurrentState} from "./state";

import bob from "../assets/test.png";

let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game")!;
let ctx = canvas.getContext("2d")!;

export function setup():Promise<void> { // promise is just to keep it as a setup method
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth,
        canvas.height = window.innerHeight
    }, false);

    return new Promise(resolve => {
        resolve();
    });

    // settings //
    ctx.font = "16px sans-serif";
}

function render():void {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(JSON.stringify(getCurrentState()), 10, 10);
}


let renderLoop = setInterval(() => {}, 1000/60); // stopped rendering will contain a main menu render at some point
export function startRendering() {
    clearInterval(renderLoop);
    renderLoop = setInterval(render, 1000/60);
}
export function stopRendering() {
    clearInterval(renderLoop);
    renderLoop = setInterval(() => {}, 1000/60);
}