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
    game: {
        version:string;
    }
    
    constructor() {
        this.player = {
            defaultHealth: 100,
            maxSpeed: 5,
            speed: 2.5,
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
        this.game = {
            version: "pre-A3"
        }
    }
}

const constants:Constants = new Constants();
export default constants;