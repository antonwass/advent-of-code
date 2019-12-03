const { readInput } = require('../utilities.js');

const drawWires = (visited, wire, position, wireNumber) => {
    paths = wire.split(',')
    let steps = 0;
    paths.forEach(path => {
        const pathArr = path.split('');
        const dir = pathArr.shift();
        const length = parseInt(pathArr.join(''));
        for (let i = 0; i < length; i++) {
            steps++;
            switch (dir) {
                case 'R':
                    position.x++;
                    break;
                case 'U':
                    position.y--;
                    break;
                case 'L':
                    position.x--;
                    break;
                case 'D':
                    position.y++;
                    break;
            }
            if (!visited[JSON.stringify({ ...position })])
                visited[JSON.stringify({ ...position })] = {}

            if (!visited[JSON.stringify({ ...position })][wireNumber])
                visited[JSON.stringify({ ...position })][wireNumber] = steps // steps added for part two
        }
    });
}

const manhattan = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const partOne = (input) => {
    const wires = input.split('\n');
    const wireOne = wires[0];
    const wireTwo = wires[1];

    const visited = {};
    drawWires(visited, wireOne, { x: 0, y: 0 }, 'one')
    drawWires(visited, wireTwo, { x: 0, y: 0 }, 'two')

    const matches = [];
    for (let positionKey of Object.keys(visited)) {
        let position = visited[positionKey];
        if (position['one'] && position['two']) {
            const positionObj = JSON.parse(positionKey);
            matches.push(manhattan({ x: 0, y: 0 }, positionObj));
        }
    }
    matches.sort((a, b) => a - b);
    return matches[0]
}

const partTwo = (input) => {
    const wires = input.split('\n');
    const wireOne = wires[0];
    const wireTwo = wires[1];

    const visited = {};
    drawWires(visited, wireOne, { x: 0, y: 0 }, 'one')
    drawWires(visited, wireTwo, { x: 0, y: 0 }, 'two')

    const matches = [];
    for (let positionKey of Object.keys(visited)) {
        let position = visited[positionKey];
        if (position['one'] && position['two']) {
            const positionObj = JSON.parse(positionKey);
            matches.push(position['one'] + position['two']);
        }
    }
    matches.sort((a, b) => a - b);
    return matches[0]
}

readInput(__dirname + '/input-1.txt', (err, input) => console.log(partOne(input)));
readInput(__dirname + '/input-2.txt', (err, input) => console.log(partTwo(input)));