import * as pixi from "pixi.js";

let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game");

export function setup():Promise<void> {
    let app = new pixi.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        backgroundAlpha: 1,
        resolution: 1,
        view: canvas
    });
    return new Promise(resolve => {

    });
}