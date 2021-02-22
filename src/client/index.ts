import "./css/main.scss";

import networking from "./ts/networking";

console.log("hi");

Promise.all([
    networking
]).then(() => {

});