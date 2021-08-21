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
        chatBubbleLifetime:number;
    }
    
    constructor() {
        this.player = {
            defaultHealth: 100,
            maxSpeed: 5,
            speed: 2.5,
            radius: 32
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
            version: "pre-A5",
            chatBubbleLifetime:5000
        }
    }
}

const constants:Constants = new Constants();
export default constants;