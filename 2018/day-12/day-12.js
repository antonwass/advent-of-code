let Day = require('../../day.js');

class Day12 extends Day {
    constructor(callback) {
        super(callback);
        this.day = 12;
    }
    part1(input) {
        let answer = 0;
        let state = input.split('\r\n')[0].split(': ')[1].split('');
        let nextState = state.slice();
        let patterns = input.split('\r\n');
        patterns.shift(); // remove two first rows
        patterns.shift();
        let generations = 20;
        let potZeroIndex = 0;

        let patternMap = {};

        patterns.forEach(pattern => {
            patternMap[pattern.split(' => ')[0]] = pattern.split(' => ')[1];
        });
        let keys = Object.keys(patternMap);

        for (let i = 0; i < generations; i++) {

            if (state[0] === '#') {
                state.unshift('.');
                nextState.unshift('.');
                potZeroIndex++;
            }

            if (state[state.length - 1] === '#') {
                state.push('.');
                nextState.push('.');
            }

            for (let j = 0; j < state.length; j++) {
                let testPattern = [
                    j - 2 < 0 ? '.' : state[j - 2],
                    j - 1 < 0 ? '.' : state[j - 1],
                    state[j],
                    j + 1 > state.length - 1 ? '.' : state[j + 1],
                    j + 2 > state.length - 1 ? '.' : state[j + 2]
                ];

                nextState[j] = patternMap[testPattern.join('')];
            }

            let temp = state;
            state = nextState;
            nextState = temp;
        }


        for (let i = 0; i < state.length; i++) {
            if (state[i] === '#')
                answer += (i - potZeroIndex)
        }

        //console.log(state.join(''));

        return answer;
    }

    part2(input) {
        let answer = 0;
        let prevAnswer = 0;
        let prevDiff = 0;
        let patterns = input.split('\r\n');
        patterns.shift(); // remove two first rows
        patterns.shift();
        let generations = 1000;

        let patternMap = {};

        patterns.forEach(pattern => {
            patternMap[pattern.split(' => ')[0]] = pattern.split(' => ')[1];
        });

        let pots = input.split('\r\n')[0].split(': ')[1].split('').map((pot, index) => {
            return {
                i: index,
                plant: pot
            }
        });

        //console.log(pots);

        // initialize pots
        for (let i = 0; i < pots.length; i++) {
            if (i > 0)
                pots[i].left = pots[i - 1];

            if (i < pots.length)
                pots[i].right = pots[i + 1];
        }

        

        let firstPot = pots[0];
        let lastPot = pots[pots.length - 1];

        pots = undefined;

        for (let i = 0; i < generations; i++) {
            

            if (firstPot.plant === '#') {
                let newPot = {
                    i: firstPot.i - 1,
                    right: firstPot,
                    plant: '.'
                }
                //pots.unshift(newPot);
                firstPot.left = newPot;
                firstPot = newPot;
            }

            if (lastPot.plant === '#') {
                let newPot = {
                    i:lastPot.i + 1,
                    left: lastPot,
                    plant: '.'
                }
                //pots.push(newPot);
                lastPot.right = newPot;
                lastPot = newPot;
            }

            let pot = firstPot;
            while(pot){
            //for (let pot of pots) {
                //console.log(pot.left);
                let pattern = pot.left && pot.left.left ? pot.left.left.plant : '.';
                pattern += pot.left ? pot.left.plant : '.';
                pattern += pot.plant;
                pattern += pot.right ? pot.right.plant : '.';
                pattern += pot.right && pot.right.right ? pot.right.right.plant : '.';
                // console.log(patternMap[pattern]);
                pot.nextGen = patternMap[pattern];

                pot = pot.right;
            }

            //for (let pot of pots) {
            pot = firstPot;
            while(pot){
                pot.plant = pot.nextGen;

                pot = pot.right;
            }

            pot = firstPot;
            answer = 0;
            while(pot){
                answer += pot.plant === '#' ? pot.i : 0;
                pot = pot.right;
            }

            //console.log(i, answer, (answer-prevAnswer));

            prevAnswer = answer;
        }

        let pot = firstPot;
        answer = 0;
        while(pot){
            answer += pot.plant === '#' ? pot.i : 0;
            pot = pot.right;
        }

        //console.log(answer);

        answer += ((50000000000 - generations)*86) // after 157 generations, each generation added 86 new plants.
        //console.log(answer);
        return answer;
    }
}

module.exports = Day12;