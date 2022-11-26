import {generateMap, MapConfig} from "./generate";
import Dirt from "../entities/dirt";
import Ground from "../entities/ground";
import {nanoid} from "nanoid";
import Matter from "matter-js";
import Vector2 from "../types/vector2";
import Entity from "../entities/entity";

export function getMap(config:MapConfig):Array<Entity> {
    let [dirts, grounds] = generateMap(config);

    let objects = [];
    for(let dirt of dirts) {
        let vertices = dirt.map(p => {
            return {x: p[0], y: p[1]}
        });
        let position = Matter.Vertices.centre(vertices);
        objects.push(new Dirt(nanoid(), new Vector2(position.x, position.y), vertices));
    }

    for(let ground of grounds) {
        let vertices = ground.map(p => {
            return {x: p[0], y: p[1]}
        });
        let position = Matter.Vertices.centre(vertices);
        objects.push(new Ground(nanoid(), new Vector2(position.x, position.y), vertices));
    }

    return objects;
}