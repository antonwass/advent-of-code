let Day = require('../../day.js');

const fs = require('fs');

class Day6 extends Day {
    constructor(callback) {
        super(callback);
        this.day = 6;
    }
    part1(input) {
        let answer;


        let coordinates = input.split('\r\n').map((coord) => {
            const split = coord.split(', ');
            return { x: parseInt(split[0]), y: parseInt(split[1]) };
        })

        // console.log(coordinates);
        let minX, minY, maxX, maxY;

        coordinates.forEach((coord) => {
            if (!minX)
                minX = coord.x;
            else if (coord.x < minX)
                minX = coord.x;

            if (!minY)
                minY = coord.y;
            else if (coord.y < minY)
                minY = coord.y;

            if (!maxX)
                maxX = coord.x;
            else if (coord.x > maxX)
                maxX = coord.x;

            if (!maxY)
                maxY = coord.y;
            else if (coord.y > maxY)
                maxY = coord.y;
        });

        // console.log(minX, minY, maxX, maxY);

        let width = maxX - minX;
        let height = maxY - minY;

        // console.log(width, height);

        let map = [];

        for (var i = 0; i < maxX + 1; i++) {
            map.push([]);
            for (var j = 0; j < maxY + 1; j++) {
                map[i][j] = '.';
            }
        }

        for (let i = 0; i < coordinates.length; i++) {
            let coord = coordinates[i];
            coord.id = String.fromCharCode(i + 62);
            map[coord.x][coord.y] = coord.id;
        }

        // console.log(map.length);
        // console.log(map[0].length);

        let newMap = map;

        for (var i = 0; i < newMap.length; i++) {
            for (var j = 0; j < newMap[0].length; j++) {
                let currentCoord = { x: i, y: j };
                let closestCoord;
                let closestDistance;
                let equalDistance = false;

                for (let coord of coordinates) {
                    let currentDistance = manhattan(coord, currentCoord);
                    if (!closestCoord) {
                        closestCoord = coord;
                        closestDistance = currentDistance;
                    }
                    else if (currentDistance < closestDistance) {
                        closestCoord = coord;
                        closestDistance = currentDistance;
                        equalDistance = false;
                    }
                    else if (currentDistance === closestDistance) {
                        equalDistance = true;
                    }
                }

                newMap[i][j] = equalDistance ? '.' : closestCoord.id;

            }
        }

        let candidates = coordinates.slice().filter((coord) => {
            if (coord.x > minX && coord.x < maxX && coord.y > minY && coord.y < maxY)
                return true;
            else
                return false;
        })

        // console.log(coordinates.length, candidates.length);

        let best;

        for (let candidate of candidates) {
            let result = countArea(map, candidate.id);
            candidate.area = result.area;
            if (result.infinite) {
                continue;
            }
            if (!best) {
                best = candidate;
            }
            else if (candidate.area > best.area)
                best = candidate;

            //console.log(area);
        }

        let board = "";
        for (let row of newMap) {
            board += row.join('') + "\n";
        }
        fs.writeFile("./2018/day-6/output.txt", board, function (err) {
            if (err) {
                return console.log(err);
            }
            //console.log("The file was saved!");
        });
        answer = best;
        // console.log(coordinates);
        // console.log(candidates);
        // console.log(best);

        return answer.area;
    }

    part2(input) {
        let answer;


        let coordinates = input.split('\r\n').map((coord) => {
            const split = coord.split(', ');
            return { x: parseInt(split[0]), y: parseInt(split[1]) };
        })

        // console.log(coordinates);
        let minX, minY, maxX, maxY;

        coordinates.forEach((coord) => {
            if (!minX)
                minX = coord.x;
            else if (coord.x < minX)
                minX = coord.x;

            if (!minY)
                minY = coord.y;
            else if (coord.y < minY)
                minY = coord.y;

            if (!maxX)
                maxX = coord.x;
            else if (coord.x > maxX)
                maxX = coord.x;

            if (!maxY)
                maxY = coord.y;
            else if (coord.y > maxY)
                maxY = coord.y;
        });

        // console.log(minX, minY, maxX, maxY);

        let width = maxX - minX;
        let height = maxY - minY;

        // console.log(width, height);

        let map = [];

        for (var i = 0; i < maxX + 1; i++) {
            map.push([]);
            for (var j = 0; j < maxY + 1; j++) {
                map[i][j] = '.';
            }
        }

        for (let i = 0; i < coordinates.length; i++) {
            let coord = coordinates[i];
            coord.id = String.fromCharCode(i + 62);
            map[coord.x][coord.y] = coord.id;
        }

        // console.log(map.length);
        // console.log(map[0].length);

        let newMap = map;

        for (var i = 0; i < newMap.length; i++) {
            for (var j = 0; j < newMap[0].length; j++) {
                let currentCoord = { x: i, y: j };
                // let closestCoord;
                // let closestDistance;
                let equalDistance = false;
                let sumDistance = 0;

                for (let coord of coordinates) {
                    let currentDistance = manhattan(coord, currentCoord);
                    sumDistance += currentDistance;
                    // if (!closestCoord) {
                    //     closestCoord = coord;
                    //     closestDistance = currentDistance;
                    // }
                    // else if (currentDistance < closestDistance) {
                    //     closestCoord = coord;
                    //     closestDistance = currentDistance;
                    //     equalDistance = false;
                    // }
                    // else if (currentDistance === closestDistance) {
                    //     equalDistance = true;
                    // }
                }

                newMap[i][j] = sumDistance;

            }
        }

        let candidates = coordinates.slice().filter((coord) => {
            if (coord.x > minX && coord.x < maxX && coord.y > minY && coord.y < maxY)
                return true;
            else
                return false;
        })

        console.log(coordinates.length, candidates.length);

        let best;

        for (let candidate of candidates) {
            let result = countAreaLessThan(map,10000);
            candidate.area = result.area;
            if (result.infinite) {
                continue;
            }
            if (!best) {
                best = candidate;
            }
            else if (candidate.area > best.area)
                best = candidate;

            //console.log(area);
        }

        let board = "";
        for (let row of newMap) {
            board += row.join(',') + "\n";
        }
        fs.writeFile("./2018/day-6/output-2.txt", board, function (err) {
            if (err) {
                return console.log(err);
            }
            // console.log("The file was saved!");
        });
        answer = best;
        // console.log(coordinates);
        // console.log(candidates);
        // console.log(best);

        return answer.area;
    }
}


function manhattan(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function countArea(arr2d, id) {
    //console.log(id);
    let area = 0;
    let infinite = false;
    for (let i = 0; i < arr2d.length; i++) {
        for (let j = 0; j < arr2d[0].length; j++) {
            if (arr2d[i][j] === id) {
                if (i === 0 || i === arr2d.length-1 || j === 0 || j === arr2d[0].length-1) {
                    infinite = true;
                }
                area++;
            }
        }
    }
    return { area: area, infinite: infinite };
}

function countAreaLessThan(arr2d, threshold) {
    //console.log(id);
    let area = 0;
    let infinite = false;
    for (let i = 0; i < arr2d.length; i++) {
        for (let j = 0; j < arr2d[0].length; j++) {
            if (arr2d[i][j] < threshold) {
                // if (i === 0 || i === arr2d.length-1 || j === 0 || j === arr2d[0].length-1) {
                //     infinite = true;
                // }
                area++;
            }
        }
    }
    return { area: area, infinite: infinite };
}
module.exports = Day6;