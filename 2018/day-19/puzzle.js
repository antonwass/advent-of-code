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

const instructions = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(a => a.split(' '));


let ip = instructions.shift()[1];


// let reg = [1, 0, 0, 0, 0, 0];
// let pointer = reg[ip];

let reg = [0, 1, 10, 9, 0, 0];
let pointer = 10


while (true) {
    let prev0 = reg[0];
    //console.log(reg, pointer);
    if (pointer < 0 || pointer >= instructions.length)
        break;
    reg[ip] = pointer;
    let instr = instructions[pointer];
    let oc = instr[0];
    let fun = functions.find(f => f.name === oc);

    fun(reg, parseInt(instr[1]), parseInt(instr[2]), parseInt(instr[3]))

    pointer = reg[ip];
    pointer++;
    //if (prev0 !== reg[0])
   // console.log(instr, reg, pointer);

}
// console.log(ip);
// console.log(instructions);
// console.log(reg)


// this is the solution for part 2, don't know if it was the right way to do it.
// I printed the outputs of the register and analyzed when the program should halt.
// When the register[1] > register[2], the program halts. I found this out by looking at the repeating instrucitons,
// and confirmed it by 'modifying' register[2] to a lower value (so tha thte execution is faster).
// Then I had to figure out when the register 0 value changes, and noticed that whenever register[1] * register[5] === register[2], register[0] changes
// Then I had to find the pattern for register[0] increments, which was register[0] + register[1]
// Finally, I wrote the program below to mimic the behaviour of the original program,
// but I optimized it by skipping values where a*b > limit (which would not increase register[0] until "overflow").
// That is the inner loop:  for (let b = 1; b <= limit/a; b++)
// This greatly increased the speed of the program and gave me the answer
// The program is calculating the sum of factors for r2
let r0 = 0;
let r1 = 1;
let r2 = 10551282;

while (r1 <= r2) {
    for (let r5 = 1; r1*r5<=r2; r5++) {
        if(r1*r5===r2)
        {
            r0 += r1;
        } 
    }
    r1++;
}


console.log(r0);