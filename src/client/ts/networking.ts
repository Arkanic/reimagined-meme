import io from "socket.io-client";
import {throttle} from "throttle-debounce";
import constants from "../../shared/constants";
import {handleGameUpdate} from "./handler";

import * as Data from "../../shared/inputObject";

const protocol:string = (window.location.protocol.includes("https")) ? "wss" : "ws";
const socket:SocketIOClient.Socket = io(`${protocol}://${window.location.host}`, {reconnection:false});

const connected:Promise<void> = new Promise((resolve) => {
    socket.on("connect", () => {
        console.log(`Connected, using ${protocol}`);
        resolve();
    });
});

export const connect = ():void => {
    connected.then(() => {
        console.log("Started handlers");
        socket.on(constants.msg.update, handleGameUpdate);
        socket.on(constants.msg.serverclosing, function (data:any) {
            document.getElementById("disconnect-message")!.innerHTML = data.message;
        })

        socket.on("disconnect", () => {
            console.log("disconnected");
            document.getElementById("disconnected")!.classList.remove("hidden");
            document.getElementById("reconnect-button")!.addEventListener("click", (e) => {
                window.location.reload();
            });
        });
    });
}

export const play = (data:Data.Join) => {
    socket.emit(constants.msg.join, {data});
}

export const updateInput = throttle(20, (state:Data.Input) => {
    socket.emit(constants.msg.input, {state});
});