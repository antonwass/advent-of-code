let Day1 = require('./day-1/day-1.js');
let Day2 = require('./day-2/day-2.js');
let Day3 = require('./day-3/day-3.js');
let Day4 = require('./day-4/day-4.js');
let Day5 = require('./day-5/day-5.js');
let Day6 = require('./day-6/day-6.js');
let Day7 = require('./day-7/day-7.js');
let Day8 = require('./day-8/day-8.js');
let Day9 = require('./day-9/day-9.js');
let Day10 = require('./day-10/day-10.js');
let Day11 = require('./day-11/day-11.js');
let Day12 = require('./day-12/day-12.js');
let Day13 = require('./day-13/day-13.js');
let Day14 = require('./day-14/day-14.js');

let date = 14;
let challenges = {};

if (process.argv.length > 2) {
    // run a specific challenge
    switch (process.argv[2]) {
        case '1':
            new Day1((day, result) => console.log(result)).run();
            break;
        case '2':
            new Day2((day, result) => console.log(result)).run();
            break;
        case '3':
            new Day3((day, result) => console.log(result)).run();
            break;
        case '4':
            new Day4((day, result) => console.log(result)).run();
            break;
        case '5':
            new Day5((day, result) => console.log(result)).run();
            break;
        case '6':
            new Day6((day, result) => console.log(result)).run();
            break;
        case '7':
            new Day7((day, result) => console.log(result)).run();
            break;
        case '8':
            new Day8((day, result) => console.log(result)).run();
            break;
        case '9':
            new Day9((day, result) => console.log(result)).run();
            break;
        case '10':
            new Day10((day, result) => console.log(result)).run();
            break;
        case '11':
            new Day11((day, result) => console.log(result)).run();
            break;
        case '12':
            new Day12((day, result) => console.log(result)).run();
            break;
        case '13':
            new Day13((day, result) => console.log(result)).run();
            break;
        case '14':
            new Day14((day, result) => console.log(result)).run();
            break;


        default:
            console.log('Could not find challenge')
            break;
    }

} else {
    // run all challenges
    new Day1(resultHandler).run();
    new Day2(resultHandler).run();
    new Day3(resultHandler).run();
    new Day4(resultHandler).run();
    new Day5(resultHandler).run();
    new Day6(resultHandler).run();
    new Day7(resultHandler).run();
    new Day8(resultHandler).run();
    new Day9(resultHandler).run();
    new Day10(resultHandler).run();
    new Day11(resultHandler).run();
    new Day12(resultHandler).run();
    new Day13(resultHandler).run();
    new Day14(resultHandler).run();
    // new Day15(resultHandler).run();
    // new Day16(resultHandler).run();
    // new Day17(resultHandler).run();
    // new Day18(resultHandler).run();
    // new Day19(resultHandler).run();
    // new Day20(resultHandler).run();
    // new Day21(resultHandler).run();
    // new Day22(resultHandler).run();
    // new Day23(resultHandler).run();
    // new Day24(resultHandler).run();
    // new Day25(resultHandler).run();
}


function resultHandler(day, result) {
    challenges['day' + day] = result;
    checkDays();
}

function checkDays() {
    let allDone = true;
    for (let i = 1; i <= date; i++) {
        if (!challenges['day' + i]) {
            allDone = false;
        }
    }

    if (allDone) {
        console.dir(challenges);
    }
}