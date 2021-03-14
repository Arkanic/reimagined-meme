import * as state from "./state";
import * as background from "./render/background";
import * as game from "./render/game";
import * as mouse from "./input/mouse";
import * as keyboard from "./input/keyboard";

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