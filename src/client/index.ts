import "./css/main.scss";

import * as networking from "./ts/networking";

console.log("hi");

Promise.all([
    networking.connect
]).then(() => {
    networking.play("test", window.innerWidth, window.innerHeight);
});