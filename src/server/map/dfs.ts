function encodePos(x:number, y:number):string {
    return `${x}x${y}`;
}

function decodePos(pos:string):Array<number> {
    return pos.split("x").map(x => parseInt(x));
}

type AdjacencyMatrix = {[unit:string]:Array<string>};

function getAdjacencyMatrix(map:Array<Array<boolean>>):AdjacencyMatrix {
    let d:{[unit:string]:Array<string>} = {};

    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[i].length; j++) {
            if(!map[i][j]) continue;

            d[encodePos(i, j)] = [];

            for(let didj of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
                let [di, dj] = didj;

                let ni = di + i;
                let nj = dj + j;

                if(ni < 0 || nj < 0 || ni >= map.length || nj >= map[ni].length) continue;

                if(!map[ni][nj]) continue;

                d[encodePos(i, j)].push(encodePos(ni, nj));
            }
        }
    }

    return d;
}

export function getIslands(map:Array<Array<boolean>>):Array<Array<Array<number>>> {
    let am = getAdjacencyMatrix(map);

    let islands = [];
    let seen = new Set();
    for(let coordinate in am) {
        if(seen.has(coordinate)) continue;

        let queue = [coordinate];
        let island = new Set();

        while(queue.length > 0) {
            let current = queue.pop()!;
            island.add(current);
            let neighbours = am[current];

            for(let neighbour of neighbours) {
                if(!island.has(neighbour)) {
                    queue = queue.concat(neighbour);
                }
            }
        }

        islands.push(island);
        seen = new Set([...seen, ...island]);
    }

    return islands.map(x => Array.from(x).map(y => decodePos(y as string)));
}