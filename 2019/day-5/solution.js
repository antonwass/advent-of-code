const { readInput } = require('../utilities.js');
const { compute } = require('../elf-computer')

const partOne = (input) => {
    const program = input.split(',').map(x => parseInt(x));
    //program[1] = 1;
    return compute(program, 0, 1);
}

const partTwo = (input) => {
    const program = input.split(',').map(x => parseInt(x));
    //program[1] = 1;
    return compute(program, 0, 5);
}

//readInput(__dirname+'/input-1.txt', (err, input) => console.log(partOne(input)));
readInput(__dirname+'/input-2.txt', (err, input) => console.log(partTwo(input)));