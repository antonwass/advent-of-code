const calcGeo = (cave, cord, target) => {
    if ((cord.x === 0 && cord.y === 0) || (cord.x === target.x && cord.y === target.y))
        return 0;

    if (cord.y === 0)
        return cord.x * 16807;

    if (cord.x === 0)
        return cord.y * 48271;

    return (BigInt(cave[cord.y - 1][cord.x].erosion) * BigInt(cave[cord.y][cord.x - 1].erosion));
}

const calcErosion = (geo, depth) => { return (BigInt(geo) + depth) % 20183n }

const calcRegionType = (erosion) => {
    switch (erosion % 3n) {
        case 0n:
            return '.';
        case 1n:
            return '=';
        case 2n:
            return '|';
    }
}

const calcRisk = (type) => {
    switch (type) {
        case '.':
            return 0;
        case '=':
            return 1;
        case '|':
            return 2;
    }
}

const calcTotalRisk = (cave) => {
    let risk = 0;
    for (let row of cave) {
        for (let region of row) {
            risk += region.risk;
        }
    }

    return risk;
}

const calcTools = (type) => {
    switch (type) {
        case '.':
            return 'CT';
        case '=':
            return 'CN';
        case '|':
            return 'TN'
    }
}

const depth = BigInt(510); // 3879
const mouth = { x: 0, y: 0 };
const target = { x: 10, y: 10 }; // 8,713
const cave = [];

for (let y = 0; y < target.y + 1; y++) {
    let row = [];
    cave.push(row);
    for (let x = 0; x < target.x + 1; x++) {
        let geo = calcGeo(cave, { x, y }, target);
        let erosion = calcErosion(geo, depth);
        let type = calcRegionType(erosion);
        let risk = calcRisk(type);
        let tools = calcTools(type);
        let region = { geo, erosion, type, risk, tools }

        row.push(region)
    }
}

for (let row of cave) {
    console.log(row.map(r => r.type).join(''));
}

console.log(calcTotalRisk(cave)); // part 1

// -------------- part 2 -------------

// Brute force approach. Find all possible paths and take the shortest one.

let paths = [];
let bestPath;

const move = (time, cave, me, tool, target, path) => {
    if(bestPath && time>=bestPath.time)
        return; // no point in trying

    if (me.x === target.x && me.y === target.y) {
        //paths.push({ time, path })
        //console.log(time);
        let newPath = { time, path };
        if (!bestPath)
            bestPath = { time, path: newPath };
        else if (bestPath && bestPath.time > newPath.time) {
            bestPath = newPath;
            console.log('new best path', bestPath.time);
        }

        return;
    }

    path = path.slice();

    path.push(me);
    let currentRegion = cave[me.y][me.x];
    // up
    if (me.y > 0) {
        let up = { x: me.x, y: me.y - 1 };
        let upRegion = cave[up.y][up.x];
        if (!path.find(p => p.x === up.x && p.y === up.y)) {
            for (let regionTool of upRegion.tools) {
                if (!currentRegion.tools.includes(regionTool))
                    continue; // can't switch to this tool
                if (regionTool === tool)
                    move(time+ 1, cave, up, regionTool, target, path);
                else
                    move(time + 7, cave, up, regionTool, target, path); // switch tool
            }
        }
    }

    // left
    if (me.x > 0) {
        let left = { x: me.x - 1, y: me.y };
        let leftRegion = cave[left.y][left.x];
        if (!path.find(p => p.x === left.x && p.y === left.y)) {
            for (let regionTool of leftRegion.tools) {
                if (!currentRegion.tools.includes(regionTool))
                    continue; // can't switch to this tool
                if (regionTool === tool)
                    move(time++, cave, left, regionTool, target, path);
                else
                    move(time + 7, cave, left, regionTool, target, path); // switch tool
            }
        }
    }
    // right
    if (me.x < cave[0].length - 1) {
        let right = { x: me.x + 1, y: me.y };
        let rightRegion = cave[right.y][right.x];
        if (!path.find(p => p.x === right.x && p.y === right.y)) {
            for (let regionTool of rightRegion.tools) {
                if (!currentRegion.tools.includes(regionTool))
                    continue; // can't switch to this tool
                if (regionTool === tool)
                    move(time++, cave, right, regionTool, target, path);
                else
                    move(time + 7, cave, right, regionTool, target, path); // switch tool
            }
        }
    }
    // down
    if (me.y < cave.length - 1) {
        let down = { x: me.x, y: me.y + 1 };
        let downRegion = cave[down.y][down.x];
        if (downRegion && !path.find(p => p.x === down.x && p.y === down.y)) {
            for (let regionTool of downRegion.tools) {
                if (!currentRegion.tools.includes(regionTool))
                    continue; // can't switch to this tool
                if (regionTool === tool)
                    move(time++, cave, down, regionTool, target, path);
                else
                    move(time + 7, cave, down, regionTool, target, path); // switch tool
            }
        }
    }
}

move(0, cave, { x: 0, y: 0 }, 'T', target, []);