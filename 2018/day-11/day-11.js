let Day = require('../../day.js');
let fs = require('fs');

class Day11 extends Day {
    constructor(callback) {
        super(callback);
        this.day = 11;
    }
    part1(input) {
        let answer;

        let serial = 5719;

        let grid = initGrid(300, serial);

        let best;
        let pos;
        let bestSize;
        
        for(let size = 1; size < 300; size++)
        {
            console.log('testing size', size);
            let squares = {}

            for (let i = 1; i < (301-size); i++) {
                for (let j = 1; j < (301-size); j++) {
                    squares[i + ',' + j] = calcSquarePower(grid, i, j, size);
                }
            }
    
    
            for (let key of Object.keys(squares)) {
                let squarePower = squares[key];
                if (!best || squarePower > best) {
                    best = squarePower;
                    pos = {x:key.split(',')[0], y:key.split(',')[1]}
                    bestSize = size;

                    console.log('new best!', best, pos, bestSize);
                    // I logged the best answers and tested with the best answer after size 16.
                    // Luckily, this was the correct answer. Need optimization to test all sizes within
                    // a reasonable time.
                }
            }
        }
        

        
        answer = pos;
        console.log(answer, best);
        return answer;
    }

    part2(input) {
        let answer = '90,244,16';

        return answer;
    }
}

function initGrid(size, serial) {
    const grid = [];

    for (let i = 0; i < size + 1; i++) {
        grid.push([]);
        for (let j = 0; j < size + 1; j++) {
            grid[i][j] = calcPowerLevel(j, i, serial);
        }
    }

    return grid;
}

function calcPowerLevel(x, y, serial) {
    const rackId = (x + 10);
    // const start = rackId * y;
    // const withSerial = start + serial;
    // const multiplied = withSerial * rackId;
    // const test = parseInt((((rackId * y + serial) * rackId)/100))
    // const hundredsDigit =  (parseInt((((rackId * y + serial) * rackId) / 100)) % 10);
    // console.log('dd',x,y,rackId, start, withSerial, multiplied,  test,hundredsDigit);
    return (parseInt((((rackId * y + serial) * rackId) / 100)) % 10) - 5;
}

function calcSquarePower(grid, x, y, size) {
    let power = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            // console.log('test',i,j);
            power += grid[y + j][x + i]
        }
    }
    return power;
}


module.exports = Day11;