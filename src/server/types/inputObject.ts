interface InputObject {
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

export default InputObject;