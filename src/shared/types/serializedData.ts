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
    },

    drawName:string;
}

export interface Player extends Entity {
    username:string;
    health:number;
}

export interface Polygon extends Entity {
    vertices:{x:number, y:number}[];
}

export interface World {
    time:number;
    me:Player;
    others:Array<Player>;
    entities:Array<Entity>;
}

export interface ChatMessage {
    message:string;
    sender:string;
}