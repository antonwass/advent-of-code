let Day = require('../../day.js');
const fs = require('fs');

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
            sum = frequencyChanges.reduce(function (prev, current, index, arr) {
                const next = prev + current;
                if (frequencies[next] && !answer) {
                    answer = next;
                } else {
                    frequencies[next] = true;
                }

                return next
            }, sum);
        }

        return answer;
    }
}

module.exports = Day1;