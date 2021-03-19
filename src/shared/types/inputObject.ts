export interface Input {
    mouseX:number;
    mouseY:number;
    clicking:boolean;

    keys: {
        w:boolean;
        a:boolean;
        s:boolean;
        d:boolean;
    }
}

export interface Join {
    username:string;
    screenWidth:number;
    screenHeight:number;
}

export interface Message {
    message:string;
}