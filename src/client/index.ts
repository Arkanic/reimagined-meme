import "./css/main.scss";

import * as networking from "./ts/networking";
import * as render from "./ts/render";
import * as input from "./ts/input";
import Logger from "./ts/logger";

console.log("%cREIMAGINED_MEME", "color:blue; font-size:32px; font-weight:bold;", "\nBy Arkanic"); // hehe
console.log("\n\n");
console.log("%cStop!%c\nYOUR ACCOUNT DATA COULD BE AT RISK.", "color:red; font-size: 28px; font-weight:bold;", "color:black; font-size:16px; font-family:sans-serif;");
console.log("%cIf someone told you to copy and paste something here, it is most likely malware. If you proceed, there is a highly likely chance that your game data will be stolen. Proceed at your own risk.", "color:black; font-family:sans-serif; font-size:12px;");

let logger = new Logger("main", "red");
logger.log("testing 123");

Promise.all([
    networking.connect(),
    render.setup()
]).then(() => {
    input.startInputHandling();
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