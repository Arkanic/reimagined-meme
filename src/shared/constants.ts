const constants = {
    player: {
        defaultHealth: 100,
        maxSpeed: 5,
        speed: 2.5,
        radius: 32
    },
    bodies: {
        barrel: {
            radius: 40
        }
    },
    map: {
        size: 4000,
        generation: {
            size: 200,
            scale: 0.05,
            tileSize: 10,
            concavity: 2,
            steps: [80, 110]
        }
    },
    msg: {
        join: "joingame",
        mouseinput: "mouseinputsend",
        keyboardinput: "keyboardinputsend",
        update: "gameupdate",
        chatmessage: "chatmessage",
        serverclosing: "servershutdown",
        initdata: "initdata"
    },
    game: {
        version: "1",
        chatBubbleLifetime: 5000,
        maxRenderDistance: 1000
    }
}

export default constants;