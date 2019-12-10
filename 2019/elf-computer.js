const accessParam = (program, index, mode) => mode === '1' ? program[index] : program[program[index]];

const operationOne = (program, index, modes) => {
    program[program[index + 3]] = accessParam(program, index + 1, modes[0]) + accessParam(program, index + 2, modes[1]);
    return index + 4;
}
const operationTwo = (program, index, modes) =>
{
    program[program[index + 3]] = accessParam(program, index + 1, modes[0]) * accessParam(program, index + 2, modes[1]);
    return index + 4;
} 
const operationThree = (program, index, modes, input) => {
    program[program[index+1]] = input.shift();
    return index + 2;
};

const operationFour = (program, index, modes, input, output) => {
    //console.log('output:', accessParam(program, index + 1, modes[0]));
    //output.value = accessParam(program, index + 1, modes[0]);
    output(accessParam(program, index + 1, modes[0]));
    return index + 2;
};

const operationFive = (program, index, modes, input) => {
    return accessParam(program, index+1, modes[0]) !== 0 ? accessParam(program, index+2, modes[1]) : index + 3;
}

const operationSix = (program, index, modes, input) => {
    return accessParam(program, index+1, modes[0]) === 0 ? accessParam(program, index+2, modes[1]) : index + 3;
}

const operationSeven = (program, index, modes) =>
{
    var param1 = accessParam(program, index + 1, modes[0]);
    var param2 = accessParam(program, index + 2, modes[1]);
    if(param1 < param2)
        program[program[index + 3]] = 1;
    else
        program[program[index + 3]] = 0;
    return index + 4;
} 

const operationEight = (program, index, modes) =>
{
    var param1 = accessParam(program, index + 1, modes[0]);
    var param2 = accessParam(program, index + 2, modes[1]);
    
    if(param1 === param2)
        program[program[index + 3]] = 1;
    else
        program[program[index + 3]] = 0;
    return index + 4;
} 

const opCodeMap = {
    1: operationOne,
    2: operationTwo,
    3: operationThree,
    4: operationFour,
    5: operationFive,
    6: operationSix,
    7: operationSeven,
    8: operationEight
}

const compute = (program, index, input, output) => {
    // select operation
    //console.log(program, index);
    const firstValue = String(program[index]);
    //console.log(firstValue);
    if(firstValue === 99 || parseInt(firstValue.slice(-2)) == 99)
        return;
    //console.log(firstValue);
    
    const opCode = parseInt(firstValue.slice(-2));
    //console.log(firstValue, opCode);
    //console.log('oc', opCode);
    let operation = opCodeMap[opCode];
    //console.log(opCode,firstValue);
    const paramModes = firstValue.slice(0, firstValue.length - 2).split('').reverse().join('');
    //console.log(paramModes);
    //const instructionValues = paramModes.length;
    //console.log(firstValue, opCode, paramModes, instructionValues)
    index = operation(program, index, paramModes, input, output);
    //console.log(program, program[index]);
    return compute(program, index, input, output);
}

module.exports = {
    compute
}