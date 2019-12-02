
const { readInput } = require('../utilities.js');

const partOne = (input) => {
    return input
        .split('\n')
        .map(x => parseInt(x))
        .map(x => parseInt(x/3)-2)
        .reduce((prev, curr, i) => prev + curr,0);
}

const partTwo = (input) => {

    let calcFuel = (f) => f > 0 ? f + calcFuel(parseInt(f/3)-2) : 0;

    return input
        .split('\n')
        .map(x => parseInt(x))
        .map(mass => parseInt(mass/3)-2)
        .map(fuel => calcFuel(fuel))
        .reduce((prev, curr, i) => prev + curr,0);
}

readInput(1, 1, (err, input) => console.log(partOne(input)));
readInput(1, 2, (err, input) => console.log(partTwo(input)));