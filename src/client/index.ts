import "./css/main.scss";

import * as networking from "./ts/networking";
import * as render from "./ts/render";

Promise.all([
    networking.connect(),
    render.setup()
]).then(() => {
    render.startRendering();
    networking.play({username:"", screenWidth:window.innerWidth, screenHeight:window.innerHeight});
    networking.updateInput({
        mouseX:0,
        mouseY:0,
        clicking:false,

        keys: {
            w:true,
            a:true,
            s:false,
            d:false
        }
    });
});