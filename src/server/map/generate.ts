import concaveman from "concaveman";
import {getIslands} from "./dfs";

const Perlin = require("pf-perlin");
const perlin2 = new Perlin({dimensions: 2});

function map(number:number, inMin:number, inMax:number, outMin:number, outMax:number):number {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function whichStep(point:number, steps:Array<number>):number {
    return steps.indexOf(Math.max(...steps.filter(x => point > x)));
}

/**
 * Mapconfig
 * 
 * @param size Perlin noise grid size
 * @param scale How large of a step perlin noise should make
 * @param tileSize How large the perlin tiles are, therefore map size = size * tileSize
 * @param concavity Concaveman setting. 1 is accurate representation, Infinity is a convex shape
 * @param steps Array of indexes between 0-255 to generate islands of
 */
export interface MapConfig {
    size:number,
    scale:number,
    tileSize:number,
    concavity:number,
    steps:Array<number>
}

/**
 * Generates a list of perlin noise contour polygons from config
 * 
 * @param config configuration
 * 
 * @returns steps -> polygons -> polygon -> point [x, y]
 */
export function generateMap(config:MapConfig):Array<Array<Array<Array<number>>>> {
    const {size, scale, tileSize, concavity, steps} = config;

    let points:Array<Array<number>> = [];
    for(let x = 0; x < size; x++) {
        points.push([]);
        for(let y = 0; y < size; y++) {
            let val = perlin2.get([x * scale, y * scale]);

            let mapped = Math.floor(map(val, 0, 1, 0, 255));

            points[x].push(whichStep(mapped, steps));
        }
    }

    let polygons:Array<Array<Array<Array<number>>>> = [];

    for(let step = 0; step < steps.length; step++) {
        polygons.push([]);
        let stepPoints = points.map(y => y.map(x => x <= (step - 1)));

        let islands = getIslands(stepPoints);
        islands = islands.map(x => x.map(y => y.map(z => z * tileSize)));
        for(let island of islands) {
            let polygon = concaveman(island, concavity);
            polygons[step].push(polygon);
        }
    }

    return polygons.filter(polygon => polygon.length > 4);
}