let Day = require('../../day.js');
let fs = require('fs');

class Day10 extends Day {
    constructor(callback) {
        super(callback);
        this.day = 10;
    }
    part1(input) {
        let answer;

        let vectors = input.split('\r\n')
            .map(vector => {
                let posStr = vector.split('> velocity=<')[0]
                    .split('<')[1]
                    .split(',');

                let speedStr = vector.split('velocity=<')[1]
                    .replace('>', '')
                    .split(',');

                return {
                    x: parseInt(posStr[0]),
                    y: parseInt(posStr[1]),
                    dx: parseInt(speedStr[0]),
                    dy: parseInt(speedStr[1])
                };
            });

        let board = [];
        let prevMinArea;
        let minArea; // when the points are as close as possible, that is where our answer is! (hopefully)
        let time = -1;
        while (!minArea || !prevMinArea || minArea <= prevMinArea) {
            time++;
            let newVectors = vectors.slice().map(vector => { return { ...vector } });
            for (let vector of newVectors) {
                vector.x += vector.dx;
                vector.y += vector.dy;
            }

            let newSize = findMinMax(newVectors);
            let newArea = newSize.width * newSize.height;

            if (!minArea || newArea <= minArea) {
                prevMinArea = minArea;
                minArea = newArea;
                vectors = newVectors;
            } else {
                break;
            }
            
        }

        let minMax = findMinMax(vectors);

        clearBoard(board, minMax);
        for (let vector of vectors) {
            board[vector.y][vector.x] = '#';
        }
        printBoard(board, time);
        console.log('Time', time)

        answer = time;

        return answer; // returning the seconds instead of the message as answer. needed optical help for this one
    }

    part2(input) {
        let answer = this.part1(input);

        return answer;
    }
}

function printBoard(board, time) {
    let output = "";
    for (let row of board) {
        output += row.join('') + "\n";
    }
    fs.writeFile("./2018/day-10/second-" + time + ".txt", output, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

function clearBoard(board, size) {
    for (let i = 0; i < size.maxY + 1; i++) {
        board.push([]);
        for (let j = 0; j < size.maxX + 1; j++) {
            board[i][j] = ' ';
        }
    }
}

function findMinMax(vectors) {
    let minX = [vectors[0].x],
        maxX = vectors[0].x,
        minY = vectors[0].y,
        maxY = vectors[0].y;

    for (let i = 1; i < vectors.length; i++) {
        let vector = vectors[i];

        if (vector.x < minX) {
            minX = vector.x;
        }


        if (vector.x > maxX) {
            maxX = vector.x;
        }


        if (vector.y < minY) {
            minY = vector.y;
        }


        if (vector.y > maxY) {
            maxY = vector.y;
        }
    }

    return { width: maxX - minX, height: maxY - minY, minX: minX, maxX: maxX, minY: minY, maxY: maxY };
}

module.exports = Day10;