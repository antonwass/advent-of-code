let Day = require('../../day.js');

class Day7 extends Day {
    constructor(callback) {
        super(callback);
        this.day = 7;
    }
    part1(input) {
        let answer = '';
        let instructions = input.split('\r\n');
        let steps = {};
        instructions.forEach(item => {
            let previous = item.charAt(5);
            let step = item.charAt(36);
            if (!steps[step])
                steps[step] = { previous: [previous], next: [] }
            else
                steps[step].previous.push(previous);

        });

        instructions.forEach(item => {
            let next = item.charAt(36);
            let step = item.charAt(5);
            if (!steps[step])
                steps[step] = { previous: [], next: [next] }
            else
                steps[step].next.push(next);

        });


        //console.log('steps: ', steps);

        // find first
        let next;
        let nextSteps = [];
        for (let key of Object.keys(steps)) {
            if (steps[key].previous.length === 0) {
                nextSteps.push(key);
            }
        }
        nextSteps = nextSteps.sort();
        //console.log(nextSteps);
        next = nextSteps.shift();
        answer += next;
        nextSteps = nextSteps
            .concat(steps[next].next)
            .sort()
            .filter(step => !answer.includes(step) && steps[step].previous.every(p => answer.includes(p)));

        while (next && nextSteps.length > 0) {
            //console.log(nextSteps);
            if (nextSteps.length > 0) {
                next = nextSteps.shift();
                answer += next;
                nextSteps = nextSteps
                    .concat(steps[next].next)
                    .sort()
                    .filter(step => !answer.includes(step) && steps[step].previous.every(p => answer.includes(p)));
                //console.log(next);
            }
        }
        next = undefined;

        console.log(answer);
        // console.log(answer.split('').sort().join(''))
        return answer;
    }

    part2(input) {
        let answer = [];
        let instructions = input.split('\r\n');
        let steps = {};
        instructions.forEach(item => {
            let previous = item.charAt(5);
            let step = item.charAt(36);
            if (!steps[step])
                steps[step] = { previous: [previous], next: [] }
            else
                steps[step].previous.push(previous);

        });

        instructions.forEach(item => {
            let next = item.charAt(36);
            let step = item.charAt(5);
            if (!steps[step])
                steps[step] = { previous: [], next: [next] }
            else
                steps[step].next.push(next);

        });

        console.log('steps: ', steps);

        // find first
        let nextSteps = [];
        let seconds = 0;
        let schedule = {
            'w1': {},
            'w2': {},
            'w3': {},
            'w4': {},
            'w5': {}
        };

        for (let key of Object.keys(steps)) {
            if (steps[key].previous.length === 0) {
                nextSteps.push(key);
            }
        }

        let worker = findWorker(schedule);
        nextSteps = nextSteps.sort();
        let nextStep = nextSteps.shift();
        schedule[worker] = { step: nextStep, done: seconds+nextStep.charCodeAt(0) - 64 + 60 } //A takes 61 seconds
        //seconds++;

        while (isWorking(schedule)) {
            seconds++;
            console.log('seconds', seconds);
            console.log('schedule', schedule);
            let doneSteps = checkWorkers(schedule, seconds, answer);
            answer = answer.concat(doneSteps);
            doneSteps.forEach(step => {
                nextSteps = nextSteps
                    .concat(steps[step].next)
                    .sort()
                    .filter(step => !answer.includes(step) && steps[step].previous.every(p => answer.includes(p)));
            })

            

            let nextWorker = findWorker(schedule);
            while (nextWorker && nextSteps.length > 0) {
                //console.log(nextSteps);
                nextStep = nextSteps.shift();
                schedule[nextWorker] = { step: nextStep, done: seconds+nextStep.charCodeAt(0) - 64 + 60 } //A takes 61 seconds
                nextStep = undefined;
                //answer += next;
                // nextSteps = nextSteps
                //     .concat(steps[schedule[nextWorker].step].next)
                //     .sort()
                //     .filter(step => !answer.includes(step) && steps[step].previous.every(p => answer.includes(p)));
                //console.log(nextStep);

                nextWorker = findWorker(schedule);
                //console.log('worker = ', nextWorker);
            }

            
            // console.log('answer', answer);
            //console.log('next', nextStep, nextSteps);
        }

        // answer = seconds;
        console.log('answer', seconds);
        console.log(answer);
        answer = seconds;
        // console.log(answer.split('').sort().join(''))
        return answer;
    }
}

function isWorking(schedule) {
    for (let key of Object.keys(schedule)) {
        if (schedule[key].step) {
            return true;
        }
    }
    return false;
}

function checkWorkers(schedule, seconds) {
    let done = [];
    for (let key of Object.keys(schedule)) {
        if (schedule[key].done === seconds) {
            done.push(schedule[key].step);
            schedule[key] = {}
        }
    }
    return done;
}

function findWorker(schedule) {
    for (let key of Object.keys(schedule)) {
        if (!schedule[key].step) {
            return key;
        }
    }
}

module.exports = Day7;