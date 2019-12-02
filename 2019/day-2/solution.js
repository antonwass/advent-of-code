const { readInput } = require('../utilities.js');

// shared

let opCodeOne = (a, b) => a+b;
let opCodeTwo = (a, b) => a*b;

let compute = (program, index) => {
    // select operation
    let operation;
    switch(program[index]){
        case 1:
            operation = opCodeOne;
            break;
        case 2:
            operation = opCodeTwo;
            break;
        case 99:
            return program;
    }
    // perform operation
    program[program[index+3]] = operation(program[program[index+1]], program[program[index+2]])

    // step forward
    return compute(program, index+4);
}

const partOne = (input) => {
    let program = input.split(',').map(x => parseInt(x));
    
    program[1] = 12;
    program[2] = 2;

    return compute(program, 0)[0];
}

const partTwo = (input) => {
    let done = false;
    let noun, verb;
    for(noun = 0; noun <= 99; noun++)
    {
        for(verb = 0; verb <= 99; verb++)
        {
            let program = input.split(',').map(x => parseInt(x));
            program[1] = noun;
            program[2] = verb;
        
            done = compute(program, 0)[0] === 19690720;
            if(done)
                break;
        }
        if(done)
                break;
    }
    return 100 * noun + verb
}

readInput(__dirname+'/input-1.txt', (err, input) => console.log('part one: ' + partOne(input)));
readInput(__dirname+'/input-2.txt', (err, input) => console.log('part two: ' + partTwo(input)));