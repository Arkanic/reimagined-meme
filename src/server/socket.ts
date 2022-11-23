import io from "socket.io";
import * as serialized from "../shared/types/serializedData";
import * as skimmer from "../shared/utils/skim";

class Socket {
    socket:io.Socket;
    currentState:{[unit:string]:any};
    constructor(socket:io.Socket) {
        this.socket = socket;
        this.currentState = {
            time:0,
            me:null,
            others:[],
            entities:[]
        };
    }

    getSkim(newUpdate:serialized.World):serialized.WorldSkim {

        let skim = {
            me: newUpdate.me,
            time: newUpdate.time,
            entities: skimmer.skimArray(newUpdate.entities, this.currentState.entities),
            others: skimmer.skimArray(newUpdate.others, this.currentState.others)
        };
        
        this.currentState = newUpdate;

        return skim;
    }
}

export default Socket;