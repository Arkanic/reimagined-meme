const constants:{[unit:string]:any} = Object.freeze({
    player: {
        defaultHealth: 100,
        maxSpeed: 50,
        speed: 10
    },
    map: {
        size: 2000
    },
    msg: {
        join: "joingame",
        input: "inputsend",
        update: "gameupdate"
    }
});

export default constants;