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
        },
        ground: {
            radius: 100
        }
    },
    map: {
        size: 4000
    },
    msg: {
        join: "joingame",
        mouseinput: "mouseinputsend",
        keyboardinput: "keyboardinputsend",
        update: "gameupdate",
        chatmessage: "chatmessage",
        serverclosing: "servershutdown"
    },
    game: {
        version: "pre-A7",
        chatBubbleLifetime:5000
    }
}

export default constants;