const fs = require('fs');

const readInput = (day, part, callback) => fs.readFile(`./2019/day-${day}/input-${part}.txt`, 'utf8', callback);

module.exports = {
    readInput:readInput
};