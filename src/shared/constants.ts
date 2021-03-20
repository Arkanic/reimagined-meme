class Constants {
    player: {
        defaultHealth:number;
        maxSpeed:number;
        speed:number;
        radius:number;
    }
    map: {
        size:number;
    }
    msg: {
        join:string;
        mouseinput:string;
        keyboardinput:string;
        update:string;
        chatmessage:string;
        serverclosing:string;
    }
    
    constructor() {
        this.player = {
            defaultHealth: 100,
            maxSpeed: 50,
            speed: 10,
            radius: 20
        }
        this.map = {
            size: 2000
        }
        this.msg = {
            join: "joingame",
            mouseinput: "mouseinputsend",
            keyboardinput: "keyboardinputsend",
            update: "gameupdate",
            chatmessage: "chatmessage",
            serverclosing: "servershutdown"
        }
    }
}

const constants:Constants = new Constants();
export default constants;