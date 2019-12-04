const { readInput } = require('../utilities.js');

const checkIncreasing = (pass) => {
    let isValid = true;
    for (let i = 0; i < pass.length; i++) {
        for (let j = i + 1; j < pass.length; j++) {
            let a = pass[i];
            let b = pass[j];
            if (parseInt(a) > parseInt(b))
                isValid = false;
        }
    }
    return isValid;
}

const checkDouble = (pass) => {
    let isValid = false;
    for (let j = 0; j < pass.length; j++) {
        for (let i = 0; i < pass.length; i++) {
            if (i === j)
                continue;

            if (pass[j] === pass[i])
                isValid = true;

        }
    }
    return isValid;
}

const checkDoubleAndGroup = (pass) => {
    let isValid = false;
    for (let i = 0; i < pass.length; i++) {
        if (pass[i] === pass[i + 1] && pass[i] !== pass[i + 2] && pass[i - 1] !== pass[i]) {
            isValid = true;
            break;
        }

    }
    return isValid;
}

const partOne = (input) => {
    const range = input.split('-');

    let passwords = [];

    for (let i = parseInt(range[0]); i < parseInt(range[1]); i++)
        passwords.push(String(i));

    const matchedPasswords = passwords
        .filter(checkIncreasing)
        .filter(checkDouble);
    return matchedPasswords.length;
}

const partTwo = (input) => {
    const range = input.split('-');

    let passwords = [];

    for (let i = parseInt(range[0]); i < parseInt(range[1]); i++)
        passwords.push(String(i));

    const matchedPasswords = passwords
        .filter(checkIncreasing)
        .filter(checkDoubleAndGroup);
    return matchedPasswords.length;
}

readInput(__dirname + '/input-1.txt', (err, input) => console.log(partOne(input)));
readInput(__dirname + '/input-2.txt', (err, input) => console.log(partTwo(input)));