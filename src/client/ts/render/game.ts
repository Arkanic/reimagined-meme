import {debounce} from "throttle-debounce";
import * as state from "../state";
import constants from "../../../shared/constants";

export function render(ctx:CanvasRenderingContext2D):void {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

function renderBackground(x:number, y:number):void {
}