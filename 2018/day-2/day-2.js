let Day = require('../../day.js');

class Day2 extends Day {
    constructor(callback) {
        super(callback);
        this.day = 2;
    }

    part1(input) {
        let answer;

        let boxes = input.split('\r\n');

        let doubles = 0, threes = 0;

        boxes.forEach((box) => {
            const letters = {};
            for (let i = 0; i < box.length; i++) {
                let letter = box.charAt(i);
                if (letters[letter]) {
                    letters[letter] += 1;
                } else {
                    letters[letter] = 1;
                }
            };

            let hasDoubles = false, hasThrees = false;

            for (var key in letters) {
                if (letters[key] === 2) {
                    hasDoubles = true;
                }
                if (letters[key] === 3) {
                    hasThrees = true;
                }
            }

            if (hasDoubles) doubles++;
            if (hasThrees) threes++;
        });
        answer = doubles*threes;
        return answer;
    }

    part2(input) {
        let answer;

        let boxes = input.split('\r\n');

        let correctBox1, correctBox2;
        let differenceIndex;
        for (let i = 0; i < boxes.length; i++) {
            let box = boxes[i]; // compare this box with every other box except itself
            for (let j = 0; j < boxes.length; j++) {
                if (j === i)
                    continue; //don't compare the box with itself

                let otherBox = boxes[j];
                let differences = 0;

                for (let k = 0; k < box.length; k++) {
                    if (box.charAt(k) !== otherBox.charAt(k)) {
                        differences++;
                    }
                }

                if (differences === 1) {
                    correctBox1 = box;
                    correctBox2 = otherBox;
                }
            }
        }

        for (let k = 0; k < correctBox1.length; k++) {
            if (correctBox1.charAt(k) !== correctBox2.charAt(k)) {
                differenceIndex = k;
            }
        }

        answer = correctBox1.substring(0, differenceIndex) + correctBox1.substring(differenceIndex+1, correctBox1.length);

        return answer;
    }
}

module.exports = Day2;