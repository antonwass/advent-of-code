const fs = require('fs');
const instructions = fs.readFileSync('./input-1.txt', 'utf8')
    .split('\r\n')
    .map(a => a.split(' '))
    .map(arr => [arr[0], parseInt(arr[1]), parseInt(arr[2]), parseInt(arr[3])])

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

const functions = [addr, addi, mulr, muli, banr, bani, borr, bori, setr, seti, gtir, gtri, gtrr, eqir, eqri, eqrr];


const ip = instructions.shift()[1];
const reg = [0, 0, 0, 0, 0, 0];
let pointer = reg[ip];

// const reg = [0, 65280, 255, 65536, 19, 3970342];
// let pointer = 20;

let executionCount = 0;

let haltMap = {}
let haltArr = [];

//let states = {};

let halt;

let lastMemory = [];

const calcHalt = (r2, r5) => {
    r5 = 65536 + r2;
    r5 = r5 & 16777215;
    r5 = r5 * 65899;
    r5 = r5 & 16777215;
    return r5;
}
let solutions = [];
let prevR5 = 65536;
for (let i = 0; i < 255; i++) {
    prevR5 = calcHalt(i, prevR5);
    solutions.push(prevR5);
}


//console.log(solutions);
let prevHalt;
while (true) {
    if (pointer < 0 || pointer >= instructions.length)
        break;

    let pointerStart = pointer;
    reg[ip] = pointer;
    let instr = instructions[pointer];
    let oc = instr[0];
    let fun = functions.find(f => f.name === oc);

    fun(reg, instr[1], instr[2], instr[3])
    executionCount++;

    pointer = reg[ip];
    pointer++;

    prevHalt = halt;
    halt = { val: reg[5], executionCount }



    //if (!haltMap[reg[5]]) {
    //console.log(haltMap);
    //console.log(pointerStart, instr, reg, pointer);


    if (pointer === 29) {
        let key = reg[5];
        if (!haltMap[key]) {
            haltMap[key] = halt;
            haltArr.push(key)
           // console.log(reg, executionCount);
            console.log(pointerStart, instr, reg, pointer, executionCount);
            //console.log(haltArr);
        }else{
            console.log('duplicate key!', halt, prevHalt);
            break;
        }

    }

    //}
}
haltArr.sort((a, b) => a - b);
console.log(haltArr)

//console.log(reg, executionCount);

let arr = [];

for (let key of keys = Object.keys(haltMap)) {
    let count = haltMap[key];

    arr.push({ val: haltMap[key], count })
}



// reverse engineer
// ip = 4
// let r0 = 0, r1 = 0, r2 = 0, r3 = 0, r4 = 0, r5 = 0;


// // start
// r3 = 0 | 65536;
// r5 = 10828530;

// while (true) {
//     r2 = r3 & 255;
//     r5 = r5 + r2;
//     r5 = r5 & 16777215;
//     r5 = r5 * 65899;
//     r5 = r5 & 16777215;
//     r2 = 256 > r3 ? 1 : 0;
//     r4 = r2 + r4;               //jump
//     if (r2 === 1) {
//         // is this the string test?
//     } else {
//         r4 = r4 + 1;                //static jump
//         r2 = 0;                     // init iterator
//     }

//     while (true) {
//         r1 = r2 + 1;
//         r1 = r1 * 256;
//         r1 = r1 > r3 ? 1 : 0;
//         r4 = r4 + r1; // jump
//         if (r1 === 0) {
//             r4 = 25; // static jump
//             r3 = r2;
//             r4 = 7; // static jump
//             break;
//         } else {
//             r4 = r4 + 1; // static jump
//             r2 = r2 + 1; // add 1 to some iterator
//             r4 = 17; // jump to start
//         }

//     }
// }