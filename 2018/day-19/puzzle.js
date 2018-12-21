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

//let reg = [1, 0, 0, 0, 0, 0];
let ip = instructions.shift()[1];
let reg = [0, 8, 10551282, 9, 0, 7353];

let pointer = 10
//let pointer = reg[ip];

while (true) {
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
    console.log(instr, reg, pointer);
}
console.log(ip);
console.log(instructions);
console.log(reg)

const calc = () => {
    
}