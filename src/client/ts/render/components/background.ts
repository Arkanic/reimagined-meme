import constants from "../../../../shared/constants";

export default function renderBackground(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement, x:number, y:number):void {
    const backgroundX:number = constants.map.size / 2 - x + canvas.width / 2;
    const backgroundY:number = constants.map.size / 2 - y + canvas.width / 2;
    const backgroundGradient:CanvasGradient = ctx.createRadialGradient(
        backgroundX,
        backgroundY,
        constants.map.size / 10,
        backgroundX,
        backgroundY,
        constants.map.size / 2
    );

    backgroundGradient.addColorStop(0, "black");
    backgroundGradient.addColorStop(1, "gray");
    
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}