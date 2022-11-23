class Item {
    name:string;

    constructor(name:string) {
        this.name = name;
    }

    use():boolean {
        return false;
    }
}

export default Item;