import * as serialized from "../../shared/types/serializedData";

const renderdelay:number = 1000/60;

const gameUpdates:Array<serialized.World> = [];
let gameStart:number = 0;
let firstServerTimestamp:number = 0;

export function initState():void {
    gameStart = 0;
    firstServerTimestamp = 0;
}

export function processGameUpdate(update:serialized.World):void {
    if(!firstServerTimestamp) {
        firstServerTimestamp = update.time;
        gameStart = Date.now();
    }
    gameUpdates.push(update);

    const base:number = getBaseUpdate();
    if(base > 0) {
        gameUpdates.slice(0, base);
    }
}

function currentServerTime():number {
    return firstServerTimestamp + (Date.now() - gameStart) - renderdelay;
}

function getBaseUpdate():number {
    const serverTime:number = currentServerTime();
    for(let i = gameUpdates.length - 1; i >= 0; i--) {
        if(gameUpdates[i].time <= serverTime) {
            return i;
        }
    }
    return -1;
}

export function getCurrentState():serialized.World {
    if(!firstServerTimestamp) return <serialized.World>{};

    const base:number = getBaseUpdate();
    const serverTime:number = currentServerTime();

    if(base < 0 || base === gameUpdates.length - 1) {
        return gameUpdates[gameUpdates.length - 1];
    } else {
        const baseUpdate:serialized.World = gameUpdates[base];
        const next:serialized.World = gameUpdates[base + 1];
        const ratio:number = (serverTime - baseUpdate.time) / (next.time - baseUpdate.time);
        return {
            me: interpolateObject<serialized.Player>(baseUpdate.me, next.me, ratio),
            others: interpolateObjectArray<serialized.Player>(baseUpdate.others, next.others, ratio),
            time: interpolateNumber(baseUpdate.time, next.time, ratio)
        }
    }
}

function interpolateObject<T extends serialized.Entity>(object1:T, object2:T, ratio:number):T {
    if(!object2) return object1;

    const interpolated:{[unit:string]:any} = {};
    Object.keys(object1).forEach(key => {
        if(typeof key === "number") {
            interpolated[key] = interpolateNumber(object1[key], object2[key], ratio);
        } else {
            interpolated[key] = interpolateUnknownValue((object1 as any)[key], (object2 as any)[key], ratio);
        }
    });

    return interpolated as T;
}

function interpolateObjectArray<T extends serialized.Entity>(objects1:Array<T>, objects2:Array<T>, ratio:number):Array<T> {
    return objects1.map(o => {
        return interpolateObject(o, objects2.find(o2 => {
            return o?.id === o2?.id;
        }) as T, ratio);
    });
}

function interpolateNumber(number1:number, number2:number, ratio:number):number {
    return number1 + (number2 - number1) * ratio;
}

function interpolateUnknownValue(unknown1:any, unknown2:any, ratio:number):any {
    return unknown2;
}