
const { readInput } = require('../utilities.js');

const partOne = (input) => {
    return input
        .split('\n')
        .map(x => parseInt(x))
        .map(x => parseInt(x/3)-2)
        .reduce((prev, curr, i) => prev + curr, 0);
}

const partTwo = (input) => {
    let calcFuel = (f) => parseInt(f/3) - 2;
    let calcFuelForFuel = (f) => f > 0 ? f + calcFuelForFuel(calcFuel(f)) : 0;
    
    return input
        .split('\n')
        .map(x => parseInt(x))
        .map(calcFuel) // Map to first fuel consumption
        .map(calcFuelForFuel) // Sum the fuel consumption for each fuel
        .reduce((prev, curr, i) => prev + curr,0); // Sum the total fuel consumption for all masses
}

readInput(1, 1, (err, input) => console.log(partOne(input)));
readInput(1, 2, (err, input) => console.log(partTwo(input)));