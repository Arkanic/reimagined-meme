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
    bodies: {
        barrel: {
            radius:number
        }
        deployableWall: {
            width:number;
            height:number;
        }
    }
    
    constructor() {
        this.player = {
            defaultHealth: 100,
            maxSpeed: 5,
            speed: 2.5,
            radius: 32
        }
        this.bodies = {
            barrel: {
                radius: 40
            },
            deployableWall: {
                width: 64,
                height: 16
            }
        }
        this.map = {
            size: 4000
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
            version: "pre-A6",
            chatBubbleLifetime:5000
        }
    }
}

const constants:Constants = new Constants();
export default constants;