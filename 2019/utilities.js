const fs = require('fs');

const readInput = (path, callback) => fs.readFile(path, 'utf8', callback);

module.exports = {
    readInput:readInput
};