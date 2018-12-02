let Day = require('../../day.js');

class Day1 extends Day{
    constructor(callback) {
        super(callback);
        this.day = 1; // change this to the day of the challenge
    }

    part1(input) {
        const frequencies = input.split('\r\n');
        const answer = [...frequencies]
            .map(function (value) {
                return parseInt(value.replace('+', ''));
            })
            .reduce(function (prev, current, index, arr) {
                return prev + current;
            });

        return answer;
    }

    part2(input) {
        const frequencies = {};
        let answer;
        let sum = 0;
        let frequencyChanges = input
            .split('\r\n')
            .map((value) => parseInt(value.replace('+', '')));

        while (!answer) {
            for(let i = 0; i < frequencyChanges.length;i++)
            {
                sum += frequencyChanges[i];
                if (frequencies[sum]) {
                    answer = sum;
                    break;
                } else {
                    frequencies[sum] = true;
                }
            }
        }
        return answer;
    }
}

module.exports = Day1;