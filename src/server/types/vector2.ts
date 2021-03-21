class Vector2 {
    x:number;
    y:number;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    add(a:Vector2):void {
        this.x += a.x;
        this.y += a.y;
    }

    multiply(a:Vector2):void {
        this.x *= a.x;
        this.y *= a.y;
    }

    equals(a:Vector2):void {
        this.x = a.x;
        this.y = a.y;
    }
}

export default Vector2;