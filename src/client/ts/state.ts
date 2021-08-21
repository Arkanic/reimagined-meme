import * as serialized from "../../shared/types/serializedData";

const renderdelay:number = 1000/60;

const gameUpdates:Array<serialized.World> = [];
let gameStart:number = 0;
let firstServerTimestamp:number = 0;

/**
 * Initiate the state
 */
export function initState():void {
    gameStart = 0;
    firstServerTimestamp = 0;
}

/**
 * Process a given game update for the state
 * 
 * @param update The given game update
 */
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

/**
 * Rough current server time
 * 
 * @returns Current server time in millis since jan 1, 1970
 */
function currentServerTime():number {
    return firstServerTimestamp + (Date.now() - gameStart) - renderdelay;
}

/**
 * The base update needed based on the current state
 * 
 * @returns The index of the base update. -1 if it doesn't exist.
 */
function getBaseUpdate():number {
    const serverTime:number = currentServerTime();
    for(let i = gameUpdates.length - 1; i >= 0; i--) {
        if(gameUpdates[i].time <= serverTime) {
            return i;
        }
    }
    return -1;
}



/**
 * Pad the interpolated ratio to balance between smoothness and lag
 * 
 * @param ratio The server time ratio from between updates
 */
function padRatio(ratio:number):number {
    return Math.max(ratio + 0.25, 1);
}

/**
 * Returns the current state, interpolated
 * 
 * @returns The current interpolated state
 */
export function getCurrentState():serialized.World {
    if(!firstServerTimestamp) return <serialized.World>{};

    const base:number = getBaseUpdate();
    const serverTime:number = currentServerTime();

    if(base < 0 || base === gameUpdates.length - 1) {
        return gameUpdates[gameUpdates.length - 1];
    } else {
        const baseUpdate:serialized.World = gameUpdates[base];
        const next:serialized.World = gameUpdates[base + 1];
        const ratio:number = padRatio((serverTime - baseUpdate.time) / (next.time - baseUpdate.time));
        return {
            me: interpolateObject<serialized.Player>(baseUpdate.me, next.me, ratio),
            others: interpolateObjectArray<serialized.Player>(baseUpdate.others, next.others, ratio),
            time: interpolateNumber(baseUpdate.time, next.time, ratio)
        }
    }
}

/**
 * Interpolate an object that extends from the serialized entity.
 * 
 * @param object1 Object from update 1
 * @param object2 Object from update 2
 * @param ratio The ratio between the objects
 * 
 * @returns The interpolated result
 */
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

/**
 * Like interpolateObject, but for arrays
 * 
 * @param objects1 Array of objects from update 1
 * @param objects2 Array of object from update 2
 * @param ratio The ratio between the objects
 * 
 * @returns An array of interpolated results
 */
function interpolateObjectArray<T extends serialized.Entity>(objects1:Array<T>, objects2:Array<T>, ratio:number):Array<T> {
    return objects1.map(o => {
        return interpolateObject(o, objects2.find(o2 => {
            return o?.id === o2?.id;
        }) as T, ratio);
    });
}

/**
 * Interpolates a number
 * 
 * @param number1 Number from update 1
 * @param number2 Number from update 2
 * @param ratio The ratio between the numbers
 * 
 * @returns The interpolated result
 */
function interpolateNumber(number1:number, number2:number, ratio:number):number {
    return number1 + (number2 - number1) * ratio;
}

/**
 * Interpolates an unknown value
 * 
 * @param unknown1 Unknown from update 1
 * @param unknown2 Unknown from update 2
 * @param ratio The ratio between the unknowns
 * 
 * @returns The interpolated result
 */
function interpolateUnknownValue(unknown1:any, unknown2:any, ratio:number):any {
    return unknown2;
}