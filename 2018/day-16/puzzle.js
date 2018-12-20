const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const parseRegister = (text) => text.split(':')[1].trim().substring(1, text.split(': ')[1].length - 1).split(', ').map(a => parseInt(a));

const addr = (register, a, b, c) => register[c] = register[a] + register[b];
const addi = (register, a, b, c) => register[c] = register[a] + b;
const mulr = (register, a, b, c) => register[c] = register[a] * register[b];
const muli = (register, a, b, c) => register[c] = register[a] * b;
const banr = (register, a, b, c) => register[c] = register[a] & register[b];
const bani = (register, a, b, c) => register[c] = register[a] & b;
const borr = (register, a, b, c) => register[c] = register[a] | register[b];
const bori = (register, a, b, c) => register[c] = register[a] | b;
const setr = (register, a, b, c) => register[c] = register[a];
const seti = (register, a, b, c) => register[c] = a;
const gtir = (register, a, b, c) => register[c] = a > register[b] ? 1 : 0;
const gtri = (register, a, b, c) => register[c] = register[a] > b ? 1 : 0;
const gtrr = (register, a, b, c) => register[c] = register[a] > register[b] ? 1 : 0;
const eqir = (register, a, b, c) => register[c] = a === register[b] ? 1 : 0;
const eqri = (register, a, b, c) => register[c] = register[a] === b ? 1 : 0;
const eqrr = (register, a, b, c) => register[c] = register[a] === register[b] ? 1 : 0;

const test = (sample, fun) => {
    let register = sample.before.slice();
    fun(register, sample.instruction[1], sample.instruction[2], sample.instruction[3]);
    return register.join(',') === sample.after.join(',');
}

let functions = [addr, addi, mulr, muli, banr, bani, borr, bori, setr, seti, gtir, gtri, gtrr, eqir, eqri, eqrr];

let samplesThreeOrMoreMatches = 0;
let samples = [];
let sampleCounter = 0;

let opcodes = {};

for (let i = 0; i < data.length; i += 4) {
    let sample = {
        id: sampleCounter++,
        before: parseRegister(data[i]),
        instruction: data[i + 1].split(' ').map(a => parseInt(a)),
        after: parseRegister(data[i + 2]),
        matches: []
    };

    samples.push(sample);

    for (let f of functions) {
        if (test(sample, f)) {
            sample.matches.push(f);
        }
    }

    if (sample.matches.length >= 3)
        samplesThreeOrMoreMatches++;


    sample.matches.forEach(f => {
        if (opcodes[sample.instruction[0]]) {
            if (!opcodes[sample.instruction[0]].includes(f.name)) {
                opcodes[sample.instruction[0]].push(f.name);
            }
        } else {
            opcodes[sample.instruction[0]] = [f.name];
        }

    })



    // for (let f of functionMatches) {
    //     if (functionMap[f])
    //         functionMap[f].push(sample);
    //     else
    //         functionMap[f] = [sample];
    // }
}
//console.log(samples);
// for (let sample of samples) {
//     for (let sampleTest of samples) {
//         for (let f of sampleTest.matches) {
//             if (sampleTest.id === sample.id)
//                 continue;
//             if (!test(sampleTest, f)) {
//                 console.log('dd')
//             }
//         }
//     }
// }
//console.log(opcodes);
let opcodeFinal = {}
while (Object.keys(opcodeFinal).length < 16) {
    //console.log(Object.keys(opcodeFinal).length);
    for (let key of Object.keys(opcodes)) {
        //console.log(key, opcodes[key].join(' '))

        if (opcodes[key].length === 1) {
            //console.log('match!');
            opcodeFinal[key] = opcodes[key][0];
            for (let key2 of Object.keys(opcodes)) {
                //console.log('before', key2, opcodes[key2].length,)
                opcodes[key2] = opcodes[key2].filter(oc => opcodeFinal[key] !== oc);
                //console.log('after', key2, opcodes[key2].length)
            }
        }
    }
}

console.log(samplesThreeOrMoreMatches);
console.log(opcodeFinal);

const instructions = fs.readFileSync('./input2.txt', 'utf8').split('\r\n').map(a=>a.split(' ').map(b=>parseInt(b)));
//console.log(instructions.length);
let reg = [0,0,0,0];
for(let instr of instructions)
{
    //console.log(instr);
    let oc = opcodeFinal[instr[0]];
    let fun = functions.find(f=>f.name === oc);

    fun(reg, instr[1], instr[2], instr[3])
}
console.log(reg)