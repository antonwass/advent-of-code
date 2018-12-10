let Day = require('../../day.js');

class Day9 extends Day {
    constructor(callback) {
        super(callback);
        this.day = 9;
    }
    part1(input) {
        let answer;

        let players = 466;//544;
        let lastMarble = 71436;//71436;

        let scoreBoard = []; // index is player number
        let circle = [];
        let currentMarble = 0;
        let currentPlayer = 0;
        let nextMarbleNumber = 0;

        for (let i = 0; i < players; i++) {
            scoreBoard[i] = 0;
        }

        while (nextMarbleNumber <= lastMarble) {

            if (nextMarbleNumber > 0 && nextMarbleNumber % 23 === 0) {
                scoreBoard[currentPlayer] += nextMarbleNumber;
                //currentMarble = circle.length + (currentMarble - 7) % circle.length;
                currentMarble = currentMarble - 7 < 0 ? circle.length + (currentMarble - 7) % circle.length : (currentMarble - 7) % circle.length;
                //console.log('circle length: ', circle.length);
                // console.log('score! ', circle[currentMarble]);
                scoreBoard[currentPlayer] += circle[currentMarble];
                circle.splice(currentMarble, 1);
            }
            else {
                currentMarble = circle.length > 0 ? (currentMarble + 2) % circle.length : 0;
                circle.splice(currentMarble, 0, nextMarbleNumber);
                //currentMarble++;
            }

            //console.log('next marble:', nextMarbleNumber);
            //console.log('current marble index:', currentMarble);

            nextMarbleNumber++;
            currentPlayer++;
            currentPlayer %= players;

            // console.log(lastMarble/(lastMarble-nextMarbleNumber));
        }

        scoreBoard.sort().reverse();
        answer = scoreBoard[0];
        console.log(answer);
        return answer;
    }

    part2(input) {
        let answer;

        let players = 466; //466;
        let lastMarble = 71436*100; //71436;

        let scoreBoard = []; // index is player number
        let currentMarble = { value: 0 };

        let nextMarbleNumber = 1;

        currentMarble.next = currentMarble;
        currentMarble.prev = currentMarble;

        for (let i = 0; i < players; i++) {
            scoreBoard[i] = 0;
        }

        while (nextMarbleNumber <= lastMarble) {

            if (nextMarbleNumber > 0 && nextMarbleNumber % 23 === 0) {
                currentMarble = currentMarble.prev.prev.prev.prev.prev.prev.prev;
                
                scoreBoard[nextMarbleNumber % players] += (nextMarbleNumber) + currentMarble.value;
                
                currentMarble.prev.next = currentMarble.next;
                currentMarble.next.prev = currentMarble.prev;
                currentMarble = currentMarble.next;
                //console.log('score', currentMarble.prev.value, currentMarble.value, currentMarble.next.value);
            }
            else {
                currentMarble = currentMarble.next;

                let newMarble = {
                    value: nextMarbleNumber,
                    next: currentMarble.next,
                    prev: currentMarble

                }
                currentMarble.next.prev = newMarble;
                currentMarble.next = newMarble;
                currentMarble = newMarble;
                //console.log('normal', currentMarble.prev.value, currentMarble.value, currentMarble.next.value);
            }
            nextMarbleNumber++;
        }



        scoreBoard.sort().reverse();
        answer = scoreBoard[0];
        console.log(answer);
        return answer;
    }
}

module.exports = Day9;