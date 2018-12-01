const fs = require('fs');

class Day2 {
    constructor(callback) {
        this.callback = callback;
        this.answers = {
            part1: undefined,
            part2: undefined
        };
    }

    get dayStr() { return 'day-' + this.day; }

    run() {
        fs.readFile(`./2018/${this.dayStr}/input-1.txt`, 'utf8', (err, contents) => {
            this.part1Done(this.part1(contents));
        });

        fs.readFile(`./2018/${this.dayStr}/input-2.txt`, 'utf8', (err, contents) => {
            this.part2Done(this.part2(contents));
        });
    }

    part1() { };
    part2() { };

    part1Done(answer) {
        // console.log(this.dayStr + ' part-1:', '\x1b[32m', answer, '\x1b[0m');
        this.answers.part1 = answer;
        this.finalize();
    }

    part2Done(answer) {
        // console.log(this.dayStr + ' part-2:', '\x1b[32m', answer, '\x1b[0m');
        this.answers.part2 = answer;
        this.finalize();
    }

    finalize() {
        if (this.answers.part1 && this.answers.part2) {
            this.callback(this.day, this.answers);
        }
    }
}

module.exports = Day2;