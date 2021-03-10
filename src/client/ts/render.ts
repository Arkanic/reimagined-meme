import {getCurrentState} from "./state";

import bob from "../assets/test.png";

let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game")!;

export function setup():Promise<void> { // promise is just to keep it as a setup method

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth,
        canvas.height = window.innerHeight
    }, false);

    return new Promise(resolve => {
        resolve();
    });
}

function render():void {
    console.log(JSON.stringify(getCurrentState()));
    console.log("running");
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