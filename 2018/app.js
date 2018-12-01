let Day1 = require('./day-1/day-1.js');
// let Day2 = require('./day-2/day-2.js');

let date = 1;
let challenges = {};

if (process.argv.length > 2) {
    // run a specific challenge
    switch (process.argv[2]) {
        case '1':
            new Day1((day, result)=>console.log(result)).run();
            break;

        default:
            console.log('Could not find challenge')
            break;
    }
    
} else {
    // run all challenges
    new Day1(resultHandler).run();
    // new Day2(resultHandler).run();
    // new Day3(resultHandler).run();
    // new Day4(resultHandler).run();
    // new Day5(resultHandler).run();
    // new Day6(resultHandler).run();
    // new Day7(resultHandler).run();
    // new Day8(resultHandler).run();
    // new Day9(resultHandler).run();
    // new Day10(resultHandler).run();
    // new Day11(resultHandler).run();
    // new Day12(resultHandler).run();
    // new Day13(resultHandler).run();
    // new Day14(resultHandler).run();
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