import "./css/main.scss";

import * as networking from "./ts/networking";
import * as render from "./ts/render";
import * as input from "./ts/input";
import Logger from "./ts/logger";

console.log("%cREIMAGINED_MEME", "color:blue; font-size:32px; font-weight:bold;", "\nBy Arkanic"); // hehe
console.log("\n\n%cStop!%c\nYOUR ACCOUNT DATA COULD BE AT RISK.\n%cIf someone told you to copy and paste something here, it is most likely malware. If you continue, there is a highly likely chance that your game data will be stolen.%c\nProceed at your own risk.\n\n",
    "color:red; font-size: 28px; font-weight:bold;", "color:black; font-size:16px; font-family:sans-serif;", "color:black; font-size:12px;", "color:red; font-size:12px; font-weight:bold");

let logger:Logger = new Logger("main", "red");

const playMenu:HTMLElement = document.getElementById("play-menu")!;
const playButton:HTMLButtonElement = <HTMLButtonElement>document.getElementById("play-button")!;
const usernameInput:HTMLInputElement = <HTMLInputElement>document.getElementById("username-input")!;

Promise.all([
    networking.connect(),
    render.setup()
]).then(() => {
    playMenu.classList.remove("hidden");
    usernameInput.focus();
    
    playButton.addEventListener("click", () => {
        networking.play({username:usernameInput.value, screenWidth:window.innerWidth, screenHeight:window.innerHeight});
        logger.log(`Game started. "${usernameInput.value}" @${window.innerWidth}x${window.innerHeight}`);
        playMenu.classList.add("hidden");
        input.startInputHandling();
        render.startRendering();
    });
}).catch(logger.error);