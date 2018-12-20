const fs = require('fs');
const data = fs.readFileSync('./input-1.txt', 'utf8').split('\r\n');

const print = (grid) => { for (let row of grid) console.log(row.join('')); }

let clayCords = [];
let spring = { x: 500, y: 0 }

data.forEach(row => {
    part1 = row.split(', ')[0];
    part2 = row.split(', ')[1];
    if (part1[0] === 'x') {
        x = parseInt(part1.split('=')[1]);
        yRange = part2.split('=')[1]; // holds range

        yMin = parseInt(yRange.split('..')[0]);
        yMax = parseInt(yRange.split('..')[1])

        for (let y = yMin; y <= yMax; y++) {
            if (!clayCords.find(c => c.x === x && c.y === y))
                clayCords.push({ x, y });
        }
    }
    else {
        xRange = part2.split('=')[1]; // holds range
        y = parseInt(part1.split('=')[1]);

        xMin = parseInt(xRange.split('..')[0]);
        xMax = parseInt(xRange.split('..')[1]);

        for (let x = xMin; x <= xMax; x++) {
            if (!clayCords.find(c => c.x === x && c.y === y))
                clayCords.push({ x, y });
        }
    }
})

//console.log(clayCords);
clayCords.sort((a, b) => a.x - b.x)
let minX = clayCords[0].x - 1;
let maxX = clayCords[clayCords.length - 1].x + 2;

clayCords.sort((a, b) => a.y - b.y)
let minY = clayCords[0].y;
let maxY = clayCords[clayCords.length - 1].y;

const width = maxX - minX;
const height = maxY - minY;

console.log(minX, maxX, minY, maxY, width, height);

let grid = [];

for (let y = 0; y <= maxY; y++) {
    let row = [];
    grid.push(row);
    for (let x = 0; x <= maxX + 1; x++) {
        row.push('.');
    }
}

console.log(grid[0].length, grid.length);

for (let clay of clayCords) {
    clay.y = clay.y;
    clay.x = clay.x;
    //console.log(clay);
    grid[clay.y][clay.x] = '#';
}

spring.x = spring.x;

grid[spring.y][spring.x] = '+';

const printFile = (grid) => {
    let data = '';
    for (let row of grid)
        data += row.join('') + '\r\n';
    fs.writeFile("scan.txt", data, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

const calcWater = (grid, minY) => {
    let sum = 0;
    let rowNo = 0;
    for (let row of grid) {
        for (let point of row) {
            if ((point === '|' || point === '~') && rowNo >= minY)
                sum++;
        }
        rowNo++;
    }
    return sum;
}

const flowLeft = (grid, point) => {
    let left = { ...point };
    left.x--;
    while (grid[left.y][left.x] !== '#' && '#~'.includes(grid[left.y + 1][left.x])) {
        left.x--;
    }

    if (grid[left.y][left.x] === '#')
        return true; // wall exists
    else
        return false; // no wall
}

const flowRight = (grid, point) => {
    let right = { ...point };
    right.x++;
    while (grid[right.y][right.x] !== '#' && '#~'.includes(grid[right.y + 1][right.x])) {
        right.x++;
    }

    if (grid[right.y][right.x] === '#')
        return true; // wall exists
    else
        return false; // no wall
}

const flow = (grid, point) => {
    //print(grid);
    if (grid.length <= point.y)
        return 'overflow';

    if (grid[point.y][point.x] === '.')
        grid[point.y][point.x] = '|';

    let down = { ...point },
        left = { ...point },
        right = { ...point };

    down.y++;

    if (down.y < grid.length) {
        if (grid[down.y][down.x] !== '#') {
            if (flow(grid, down) === 'overflow')
                return;
        }
        if ('#~'.includes(grid[down.y][down.x])) {
            if (flowRight(grid, point) && flowLeft(grid, point)) {
                grid[point.y][point.x] = '~'
            }
            left.x--;
            if (!'#~'.includes(grid[left.y][left.x]))
                flow(grid, left);

            right.x++;
            if (!'#~|'.includes(grid[right.y][right.x]))
                flow(grid, right);
        }
    }

    return grid[point.y][point.x]
}

spring.y++;
flow(grid, spring)
printFile(grid);
//print(grid);
console.log(calcWater(grid, minY));