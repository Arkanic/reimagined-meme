import io from "socket.io-client";
import {throttle} from "throttle-debounce";
import constants from "../../shared/constants";
import {handleGameUpdate} from "./handler";

const protocol:string = (window.location.protocol.includes("https")) ? "wss" : "ws";
const socket:SocketIOClient.Socket = io(`${protocol}://${window.location.host}`, {reconnection:false});

const connected:Promise<void> = new Promise((resolve) => {
    socket.on("connect", () => {
        console.log(`Connected, using ${protocol}`);
        resolve();
    });
});

export const connect = ():void => {
    connected.then((working) => {
        console.log("Started handlers");
        socket.on(constants.msg.update, handleGameUpdate);
    });
}

export const play = (username:string, screenWidth:number, screenHeight:number) => {
    socket.emit(constants.msg.join, {username, screenWidth, screenHeight});
}

export const updateInput = throttle(20, state => {
    socket.emit(constants.msg.input, {state});
});