const { readInput } = require('../utilities.js');
const { compute } = require('../elf-computer')

const testThrusters = (program, sequence) => {
    let output = {value:0};
    while(sequence.length > 0)
        compute([...program], 0, [sequence.shift(), output.value], output);
    //console.log(output.value);
    return output.value;
}

// const combinations = (active, rest, arr) => {
//     if (rest.length == 0) {
//         console.log(active);
//     } else {
//         combinations(active + rest.charAt(0), rest.substring(1, rest.length), arr);
//         combinations(active, rest.substring(1, rest.length), arr);
//     }
// }

const comb = (arr,rest, combinations) => {
    //console.log(arr, rest);
    if(rest.length === 0) 
        combinations.push(arr);
    for(let i = 0; i < rest.length; i++)
    {
        let copy = [...rest];
        copy.splice(i, 1);
        comb([...arr, rest[i]],copy, combinations);
    }
}

const feedbackLoop = (program, sequence, done) => {
    let programA = [...program];
    let programB = [...program];
    let programC = [...program];
    let programD = [...program];
    let programE = [...program];
    compute(programA, 0, [sequence[0], 0], (outputA)=>{
        compute(programB, 0, [sequence[1], outputA], (outputB)=>{
            compute(programC, 0, [sequence[2], outputB], (outputC)=>{
                compute(programD, 0, [sequence[3], outputC], (outputD)=>{
                    compute(programE, 0, [sequence[4], outputD], (outputE)=>{
                        compute(programA, 0, [sequence[0], outputE], (feedback)=>{
                            console.log(feedback);
                        });
                    });
                });
            });
        });
    });
}

const partOne = (input) => {
    // let program = input.split(',').map(x => parseInt(x));

    // let phaseSettings = [0,1,2,3,4];
    // let sequences = [];
    // comb([], phaseSettings, sequences);
    // //console.log(sequences);
    // //sequences.map()
    // let results = sequences.map(s => testThrusters(program, s));
    // results.sort((a,b) => b-a);
    // return results[0];
}

const partTwo = (input) => {
    let program = input.split(',').map(x => parseInt(x));

    let phaseSettings = [9,8,7,6,5];
    // let sequences = [];
    // comb([], phaseSettings, sequences);
    // let results = sequences.map(s => testThrusters(program, s));
    // results.sort((a,b) => b-a);
    // return results[0];
    return feedbackLoop(program, phaseSettings, ()=>{console.log('done')});
}

readInput(__dirname+'/input-1.txt', (err, input) => console.log(partOne(input)));
readInput(__dirname+'/input-2.txt', (err, input) => console.log(partTwo(input)));