import "./css/main.scss";

import * as networking from "./ts/networking";

console.log("hi");

Promise.all([
    networking.connect()
]).then(() => {
    networking.play("", window.innerWidth, window.innerHeight);
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