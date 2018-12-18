let Day = require('../../day.js');

class Day15 extends Day {
    constructor(callback) {
        super(callback);
        this.day = 15;
    }
    part1(input) {
        let answer;
        let rows = input.split('\r\n');
        let idCounter = 0;
        let units = []
        let cave = [];
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let caveRow = [];
            cave.push(caveRow);
            for (let j = 0; j < row.length; j++) {
                let point = row[j];
                switch (point) {
                    case 'G':
                        units.push({ type: 'G', id: idCounter++, health: 200, dmg: 3, x: j, y: i });
                        caveRow.push('G');
                        break;
                    case 'E':
                        units.push({ type: 'E', id: idCounter++, health: 200, dmg: 3, x: j, y: i });
                        caveRow.push('E');
                        break;
                    case '#':
                        caveRow.push('#');
                        break;
                    case '.':
                        caveRow.push('.');
                        break;
                }
            }
        }

        let rounds = 0;
        //for (let tick = 0; tick < 50; tick++) {
        while (!isGameOver(units)) {
            units.sort(readSort);
            let fullRound = true;
            for (let i = 0; i < units.length; i++) {
                let unit = units[i];
                //console.log('unit making a move:', unit);
                //if (unit.type === 'E')
                if (unit.health > 0)
                    handleUnit(cave, units, unit)

                units.forEach((unit) => {
                    if (unit.health <= 0) {
                        cave[unit.y][unit.x] = '.';
                    }
                })

                if (i !== units.length - 1 && isGameOver(units)) {
                    fullRound = false;
                }
            }
            //console.log('tick=', tick, units);

            units = units.filter(unit => unit.health > 0);

            //console.log(rounds, units);
            //print(cave, units)
            //rounds++;
            if (fullRound) {
                rounds++;
            }

            //console.log(rounds, units);

        }
        //console.log('tick=', tick + 1);
        //print(cave, units)

        let hitpoints = getHitPointsLeft(units);
        answer = rounds * hitpoints;
        console.log('rounds', rounds)
        console.log('hitpoints', hitpoints)
        console.log('answer', answer);
        return answer;
    }

    part2(input) {
        let answer;

        return answer;
    }
}

const getHitPointsLeft = (units) => {
    let sum = 0;
    units.forEach(unit => sum += unit.health);
    return sum;
}

const isGameOver = (units) => {
    if (units.filter(unit => unit.type === 'G' && unit.health > 0).length === 0
        || units.filter(unit => unit.type === 'E' && unit.health > 0).length === 0) {
        return true;
    }
    return false;
}

const handleUnit = (cave, units, unit) => {
    let targetType = unit.type === 'G' ? 'E' : 'G';
    let targetUnits = units.filter(item => item.id !== unit.id && item.type === targetType && item.health > 0);

    let potentialTargetPoints = findInRangePoints(cave, targetUnits, units, unit);
    let reachableTargetPoints = [];

    for (let point of potentialTargetPoints) {
        let path = a_star(cave, { x: unit.x, y: unit.y }, point);
        point.path = path;
        if (path)
            reachableTargetPoints.push({ point, path });
    }

    // if (unit.id === 0) {
    //     console.log('potential', potentialTargetPoints);
    //     console.log('reachable', reachableTargetPoints);
    // }

    reachableTargetPoints.sort((a, b) => {
        let distDiff = a.path.length - b.path.length;

        if (distDiff === 0) {
            if (a.path.length === 0)
                return 0;
            else if (a.y === b.y)
                return a.x - b.x;
            else
                return a.y - b.y;
        } else {
            return distDiff;
        }
    });

    //console.log('potential points', unit.id, potentialTargetPoints);
    //console.log('reachable points', unit.id, reachableTargetPoints);

    let best = reachableTargetPoints[0];

    // if (unit.id === 0) {
    //     console.log('best', best);
    // }
    if (best && best.path.length > 0) {
        // need to move
        let nextPoint = best.path[0]
        cave[unit.y][unit.x] = '.';
        cave[nextPoint.y][nextPoint.x] = unit.type;
        unit.x = nextPoint.x;
        unit.y = nextPoint.y;
    }

    //ready to attack
    let adjacentUnits = findAdjacentUnits(units, unit);


    adjacentUnits.sort((a, b) => {
        let healthDiff = a.health - b.health;

        if (healthDiff === 0) {
            if (a.y === b.y) {
                return a.x - b.x;
            } else {
                return a.y - b.y;
            }
        } else {
            return healthDiff;
        }

    });



    // console.log('adjacent units', adjacentUnits);
    if (adjacentUnits.length > 0) {
        let target = adjacentUnits[0];
        target.health -= unit.dmg;
        if (target.health <= 0) {
            cave[target.y][target.x] = '.';
        }
    }
}


const findAdjacentUnits = (units, attacker) => {
    return units.filter(unit => {
        if (unit.type === attacker.type || unit.health <= 0)
            return false;

        let north = { x: attacker.x, y: attacker.y - 1 };
        let east = { x: attacker.x + 1, y: attacker.y };
        let south = { x: attacker.x, y: attacker.y + 1 };
        let west = { x: attacker.x - 1, y: attacker.y };

        if (manhattan(unit, north) === 0
            || manhattan(unit, east) === 0
            || manhattan(unit, south) === 0
            || manhattan(unit, west) === 0) {
            return true;
        } else {
            return false;
        }
    });
}

/**
 * This a* implementation is not complete
 * @param {*} map 
 * @param {*} start 
 * @param {*} destination 
 */
const a_star = (map, start, destination) => {
    let openList = [start];
    let closedList = [];
    let current = start;
    current.g = 0;

    // console.log('a_star', start, destination);
    let pathFound = false;
    do {
        openList.sort((a, b) => {
        //     if (a.y === b.y)
        //         return a.x - b.x;
        //     else
        //         return a.y - b.y;
            if (calcF(a) === calcF(b)) {
                if (a.y === b.y)
                    return a.x - b.x;
                else
                    return a.y - b.y;
            } else {
                return calcF(a) - calcF(b);
            }
        });
        current = openList.shift();
        closedList.push(current);

        if (current.x === destination.x && current.y === destination.y) {
            pathFound = true;
            break;
        }

        let neighbors = calcNeighbors(map, current, closedList);

        // neighbors = neighbors.filter(neighbor => !closedList.find(closed=>closed.x === neighbor.x && closed.y === neighbor.y));
        // let alreadyClosed = closedList.find(item => item.x === neighbor.x && item.y === neighbor.y);

        for (let neighbor of neighbors) {
            neighbor.g = current.g + 1;
            neighbor.h = manhattan(neighbor, destination);
            neighbor.prev = [current];

            let existingPath = openList.find(item => item.x === neighbor.x && item.y === neighbor.y);
            if (existingPath) {
                if (calcF(existingPath) > calcF(neighbor)) {
                    // console.log('existing path found, replacing with new shorter');
                    existingPath.g = neighbor.g;
                    existingPath.h = neighbor.h;
                    existingPath.prev = [current];
                } else if (calcF(existingPath) === calcF(neighbor)) {
                    existingPath.prev.push(current);
                }
            } else {
                openList.push(neighbor);
            }

        }
    }
    while (openList.length > 0)


    if (pathFound) {
        let path = [];
        while (current.x !== start.x || current.y !== start.y) {
            path.push(current);
            let best;
            if (current.prev.length > 1) {
                // console.log('many prev');
                for (let prev of current.prev) {
                    if (!best || (prev.y < best.y) || (prev.y === best.y && prev.x < best.x)) {
                        best = prev;
                    }
                }
            } else if (current.prev.length === 1) {
                best = current.prev[0];
            }
            current = best;
        }
        path = path.map(waypoint => { return { x: waypoint.x, y: waypoint.y } }).reverse();
        return path;
    }
}

const calcF = (a) => a.g + a.h;

const calcNeighbors = (map, point, closedList) => {
    let neighbors = [];
    let pointNorth = { x: point.x, y: point.y - 1 };
    let pointEast = { x: point.x + 1, y: point.y };
    let pointSouth = { x: point.x, y: point.y + 1 }
    let pointWest = { x: point.x - 1, y: point.y };
    //console.log(pointNorth);
    if (map[pointNorth.y][pointNorth.x] === '.'
        && !closedList.find(closed => closed.x === pointNorth.x && closed.y === pointNorth.y)) {
        neighbors.push(pointNorth);
    }

    if (map[pointEast.y][pointEast.x] === '.'
        && !closedList.find(closed => closed.x === pointEast.x && closed.y === pointEast.y)) {
        neighbors.push(pointEast);
    }

    if (map[pointSouth.y][pointSouth.x] === '.'
        && !closedList.find(closed => closed.x === pointSouth.x && closed.y === pointSouth.y)) {
        neighbors.push(pointSouth);
    }

    if (map[pointWest.y][pointWest.x] === '.'
        && !closedList.find(closed => closed.x === pointWest.x && closed.y === pointWest.y)) {
        neighbors.push(pointWest);
    }

    return neighbors;
}

const manhattan = (a, b) => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

const readSort = (a, b) => {
    if (a.y === b.y)
        return a.x - b.x;
    else
        return a.y - b.y;
}


const findInRangePoints = (cave, targets, units, unit) => {
    let inRangePoints = [];
    for (let target of targets) {
        let north = { x: target.x, y: target.y - 1 };
        let east = { x: target.x + 1, y: target.y };
        let south = { x: target.x, y: target.y + 1 };
        let west = { x: target.x - 1, y: target.y };
        if ((cave[north.y][north.x] === '.' && !getUnitByCord(units, north)) || manhattan(north, unit) === 0) {
            inRangePoints.push(north);
        }
        if ((cave[east.y][east.x] === '.' && !getUnitByCord(units, east)) || manhattan(east, unit) === 0) {
            inRangePoints.push(east);
        }
        if ((cave[south.y][south.x] === '.' && !getUnitByCord(units, south)) || manhattan(south, unit) === 0) {
            inRangePoints.push(south);
        }
        if ((cave[west.y][west.x] === '.' && !getUnitByCord(units, west)) || manhattan(west, unit) === 0) {
            inRangePoints.push(west);
        }

    }

    return inRangePoints;
}

const getUnitByCord = (units, cord) => {
    return units.find(item => item.x === cord.x && item.y === cord.y && item.health > 0);
}

const print = (cave, units) => {
    let copy = cave.slice();
    for (let unit of units) {
        copy[unit.y][unit.x] = unit.id; // .type
    }
    for (let i = 0; i < cave.length; i++) {
        let row = '';
        for (let j = 0; j < cave[0].length; j++) {
            row += cave[i][j];
        }
        console.log(row);
    }
}
module.exports = Day15;