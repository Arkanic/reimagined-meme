import * as state from "../state";
import * as assets from "../assets";
import constants from "../../../shared/constants";

import renderBackground from "./components/background";
import renderPlayer from "./components/player";

export function render(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement):void {
    const {me, others} = state.getCurrentState();
    if(!me) return; // if dead

    renderBackground(ctx, canvas, me.position.x, me.position.y);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(canvas.width / 2 - me.position.x, canvas.height / 2 - me.position.y, constants.map.size, constants.map.size);

    renderPlayer(ctx, canvas, me, me);
    others.forEach((p) => {renderPlayer(ctx, canvas, me, p)});
}