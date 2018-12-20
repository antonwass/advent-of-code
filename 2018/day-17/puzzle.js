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
let maxX = clayCords[clayCords.length - 1].x + 1;

clayCords.sort((a, b) => a.y - b.y)
let minY = clayCords[0].y;
let maxY = clayCords[clayCords.length - 1].y;

const width = maxX - minX;
const height = maxY - minY;

console.log(minX, maxX, minY, maxY, width, height);

let grid = [];

for (let y = 0; y < width + 1; y++) {
    let row = [];
    grid.push(row);
    for (let x = 0; x < height + 1; x++) {
        row.push('.');
    }
}

console.log(grid.length, grid[0].length);

for (let clay of clayCords) {
    clay.y = clay.y
    clay.x = clay.x - 500 + Math.floor(width / 2);
    grid[clay.y][clay.x] = '#';
}

spring.x = spring.x - 500 + Math.floor(width / 2);

grid[spring.y][spring.x] = '+';



// for (let i = 0; i < 5; i++) {
//     let current = { ...spring };
//     current.y++;
//     while (grid[current.y][current.x] === '.' || grid[current.y][current.x] === '|') {
//         grid[current.y][current.x] = '|';

//         current.y += 1;
//     }
//     current.y--; // back up one step
//     print(grid);
//     // first left
//     let first = { ...current };
//     let left = { ...current }, right = { ...current };
//     left.x--;
//     console.log(left);
//     while (grid[left.y][left.x] === '.') {
//         grid[left.y][left.x] = '|';
//         left.x--;
//     }
//     print(grid);

//     right.x++;
//     while (grid[right.y][right.x] === '.') {
//         grid[right.y][right.x] = '|';
//         right.x++;
//     }
//     print(grid);
//     // then right

//     // settled
//     grid[first.y][first.x] = '~';
//     print(grid);
// }

const calcWater = (grid) => {
    let sum = 0;
    for (let row of grid) {
        for (let point of row) {
            if (point === '|' || point === '~')
                sum++;
        }
    }
    return sum;
}

const flow = (grid, point) => {
    console.log(point);
    if (grid.length <= point.y)
        return 'overflow';

    if (grid[point.y][point.x] === '#')
        return '#';

    if (grid[point.y][point.x] === '~')
        return '~';

    if (grid[point.y][point.x] === '|')
        return '|';

    print(grid);

    grid[point.y][point.x] = '|';

    let down = { ...point },
        left = { ...point },
        right = { ...point };

    down.y++;

    if (down.y < grid.length - 1)
    {
        console.log('down');
        let res = flow(grid, down);
        //grid[point.y][point.x] = '|';
    }

    console.log(grid.length);
    if (down.y < grid.length - 1 && (grid[down.y][down.x] === '#' || grid[down.y][down.x] === '|')) {
        left.x--;
        console.log('left');
        let leftRes = flow(grid, left);
        //grid[point.y][point.x] = '|';

        right.x++;
        console.log('right');
        flow(grid, right);
        //grid[point.y][point.x] = '|';
    }





}


flow(grid, spring)