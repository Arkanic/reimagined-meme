export interface Entity {
    id:string;
    
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