import "./css/main.scss";

import * as networking from "./ts/networking";

console.log("hi");

Promise.all([
    networking.connect
]).then(() => {

});