export interface Entity {
    id:string;
    
    rotation:number;
    position: {
        x:number;
        y:number;
    }
    velocity: {
        x:number;
        y:number;
    }
}

export interface Player extends Entity {
    username:string;
    health:number;
}

export interface World {
    time:number;
    me:Player;
    others:Array<Player>;
}

export interface ChatMessage {
    message:string;
    sender:string;
}