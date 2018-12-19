const fs = require('fs');
const input = fs.readFileSync('./input-1.txt', 'utf8').split('\r\n');


let grid = [];
let prevResult = { open: 0, trees: 0, lumberyards: 0 }
let prevDiff = 0;

let map = {};

let minTrees = Number.MAX_SAFE_INTEGER;
let maxTrees = Number.MIN_SAFE_INTEGER;

let minLumberyards = Number.MAX_SAFE_INTEGER;
let maxLumberyards = Number.MIN_SAFE_INTEGER;

for (let row of input) {
    grid.push(row.split(''));
}

const printGrid = (grid) => {
    for (let row of grid) {
        console.log(row.join(''));
    }
}

const neighbors8 = (point, grid) => {
    let w = grid[0].length, h = grid.length;
    return [
        { x: point.x - 1, y: point.y - 1 },
        { x: point.x, y: point.y - 1 },
        { x: point.x + 1, y: point.y - 1 },
        { x: point.x - 1, y: point.y },
        { x: point.x + 1, y: point.y },
        { x: point.x - 1, y: point.y + 1 },
        { x: point.x, y: point.y + 1 },
        { x: point.x + 1, y: point.y + 1 }
    ].filter(p => p.x >= 0 && p.x < w && p.y >= 0 && p.y < h)
        .map(p => grid[p.x][p.y]);
}

const countGrid = (grid) => {
    let result = { open: 0, trees: 0, lumberyards: 0 };
    for (let row of grid) {
        for (let acre of row) {
            switch (acre) {
                case '.':
                    result.open++;
                    break;
                case '#':
                    result.lumberyards++;
                    break;
                case '|':
                    result.trees++;
                    break;
            }
        }
    }

    return result;
}

//printGrid(grid);

for (let minute = 0; minute < 1010; minute++) {
    let nextGrid = grid.map(arr => arr.slice());
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            let acre = grid[x][y];
            let neighbors = neighbors8({ x, y }, grid);
            let trees = 0, open = 0, lumberyards = 0;

            for (let nb of neighbors) {
                switch (nb) {
                    case '.':
                        open++;
                        break;
                    case '|':
                        trees++;
                        break;
                    case '#':
                        lumberyards++;
                        break;
                }
            }

            if (acre === '.' && trees >= 3) {
                acre = '|';
            } else if (acre === '|' && lumberyards >= 3) {
                acre = '#'
            } else if (acre === '#' && (lumberyards === 0 || trees === 0)) {
                acre = '.'
            }
            nextGrid[x][y] = acre;
        }
    }

    grid = nextGrid;
    //console.log(minute);
    //printGrid(grid);
    let result = countGrid(grid);
    if (result.trees > maxTrees)
        maxTrees = result.trees;

    if (result.trees < minTrees)
        minTrees = result.trees;

    if (result.lumberyards > maxLumberyards)
        maxLumberyards = result.lumberyards;

    if (result.lumberyards < minLumberyards)
        minLumberyards = result.lumberyards;

    //let openDiff = result.open - (result.trees + result.lumberyards);

    //onsole.log(2500-result.open);
    //console.log(minute);
    //console.log((result.trees - prevResult.trees) + '\t' + (result.lumberyards - prevResult.lumberyards) + '\t' + (result.open - prevResult.open) + '\t');
    //console.log(result.trees + '\t' + result.lumberyards + '\t' + result.open);
    //console.log(result.trees * result.lumberyards);
    //console.log(result.lumberyards + result.trees +'\t'+result.open);
    //console.log(minTrees + '\t' + maxTrees + '\t' + minLumberyards + '\t' + maxLumberyards);
    //console.log(result.trees - result.lumberyards);
    //console.log(result.trees*result.lumberyards - prevResult.trees * prevResult.lumberyards);

    let key = result.trees * result.lumberyards
    if (map[key]) {
        map[key].count++;
        map[key].minute.push(minute+1);
    }
    else
        map[key] = { count: 1, minute: [minute+1] };

    //console.log(minute, map);
    //printGrid(grid);
    prevResult = result;
    //prevDiff = openDiff;
}

let filtered = [];

for (let key of Object.keys(map)) {
    if (map[key].count > 2 && key !== '183360' && key !== '153811')
        filtered.push({ ...map[key], key: parseInt(key) });
}

filtered 
    = filtered.filter(a => parseInt(a.key) > 183040 && parseInt(a.key) < 184000)
    .sort((a, b) => {
        return b.minute - a.minute;
    });
console.log(filtered, filtered.length);

for(let res of filtered)
{
    for(let i = res.minute[res.minute.length-1]; i <= 1000000000; i+=28)
    {
        if(i === 1000000000 )
        {
            console.log('this is the one', res.key);
        }
    }
}

let result = countGrid(grid);
console.log(result.lumberyards * result.trees);