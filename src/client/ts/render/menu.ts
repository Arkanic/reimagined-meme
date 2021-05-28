import renderBackground from "./components/background";
import constants from "../../../shared/constants";

/**
 * Render the menu
 * 
 * @param ctx The canvas 2D context
 * @param canvas The canvas element
 */
export function render(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement):void {
    const t:number = Date.now() / 7500;
    const x:number = constants.map.size / 2 + 800 * Math.cos(t);
    const y:number = constants.map.size / 2 + 800 * Math.sin(t);
    renderBackground(ctx, canvas, x, y);
}