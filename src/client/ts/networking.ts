import io from "socket.io-client";

const protocol:string = (window.location.protocol.includes("https")) ? "wss" : "ws";
const socket:SocketIOClient.Socket = io(`${protocol}://${window.location.host}`, {reconnection:false});

const connected:Promise<void> = new Promise((resolve) => {
    socket.on("connect", () => {
        console.log(`Connected, using ${protocol}`);
        resolve();
    });
});

const connect = ():void => {
    connected.then(() => {
    });
}
export default connect;