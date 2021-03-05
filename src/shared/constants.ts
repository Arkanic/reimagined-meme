const constants:{[unit:string]:any} = Object.freeze({
    player: {
        defaultHealth: 100,
        maxSpeed: 10,
        speed: 5
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