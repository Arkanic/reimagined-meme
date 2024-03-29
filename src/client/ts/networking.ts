import io from "socket.io-client";
import {throttle} from "throttle-debounce";
import constants from "../../shared/constants";
import {handleGameUpdate, handleChatMessage, handleInitData} from "./handler";
import Logger from "./logger";

import * as Data from "../../shared/types/inputObject";

let logger:Logger = new Logger("networking", "blue");

const protocol:string = (window.location.protocol.includes("https")) ? "wss" : "ws";
const socket:SocketIOClient.Socket = io(`${protocol}://${window.location.host}`, {reconnection:false});
let disconnectMessage:string = "Unknown. Try checking your network. If not, the server may have crashed.";

const connected:Promise<void> = new Promise((resolve) => {
    socket.on("connect", () => {
        logger.log(`Connected, using ${protocol}`);
        resolve();
    });
});

/**
 * Connect to the socket system
 */
export function connect() {
    connected.then(() => {
        logger.log("Started handlers");
        socket.on(constants.msg.update, handleGameUpdate);
        socket.on(constants.msg.chatmessage, handleChatMessage);
        socket.on(constants.msg.initdata, handleInitData)
        socket.on(constants.msg.serverclosing, function (data:any) {
            disconnectMessage = data.message;
            document.getElementById("disconnect-message")!.innerHTML = data.message;
        });

        socket.on("disconnect", () => {
            logger.error("disconnected");
            logger.error(`(${disconnectMessage})`);
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

export const updateMouseInput = throttle(20, (state:Data.MouseInput) => {
    socket.emit(constants.msg.mouseinput, {state});
});

let previousKeyboardState = {};
export const updateKeyboardInput = (state:Data.KeyboardInput) => {
    // if a key has actually changed
    if(previousKeyboardState != JSON.stringify(state)) {
        socket.emit(constants.msg.keyboardinput, {state});
        previousKeyboardState = JSON.stringify(state);
    }
}

export const sendMessage = throttle(20, (data:Data.Message) => {
    socket.emit(constants.msg.chatmessage, {data});
});