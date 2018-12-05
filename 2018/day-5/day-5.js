let Day = require('../../day.js');

class Day5 extends Day {
    constructor(callback) {
        super(callback);
        this.day = 5;
    }
    part1(input) {
        let answer;
        let polymer = input;

        let best;

        for (let i = 0; i < polymer.length; i++) {
            let a = polymer.charAt(i), b = polymer.charAt(i + 1);
            while ((a.toLowerCase() !== a && a.toLowerCase() === b)
                || (a.toUpperCase() !== a && a.toUpperCase() === b)) {
                //reaction

                polymer = removeCharsAtIndex(polymer, i, 2);

                if (i > 0)
                    i--;

                a = polymer.charAt(i);
                b = polymer.charAt(i + 1);
            }
        }
        answer = polymer.length;

        console.log('answer', answer);
        return answer;
    }

    part2(input) {
        let answer;
        let polymer = input.slice();

        

        let best;
        for (let unit = 'a'.charCodeAt(); unit <= 'z'.charCodeAt(); unit++) {

            let unitAsChar = String.fromCharCode(unit);

            let replace = unitAsChar+'|'+unitAsChar.toUpperCase();
            let re = new RegExp(replace, "g");

            //console.log('removing', unitAsChar);

            polymer = polymer.replace(re, '')

            //console.log('new polymer', polymer);

            for (let i = 0; i < polymer.length; i++) {
                let a = polymer.charAt(i), b = polymer.charAt(i + 1);
                while ((a.toLowerCase() !== a && a.toLowerCase() === b)
                    || (a.toUpperCase() !== a && a.toUpperCase() === b)) {
                    //reaction

                    polymer = removeCharsAtIndex(polymer, i, 2);

                    if (i > 0)
                        i--;

                    a = polymer.charAt(i);
                    b = polymer.charAt(i + 1);
                }
            }
            if(!best || polymer.length < best)
            {
                best = polymer.length;
            }
            // console.log(polymer.length);
            polymer = input.slice();
            
        }

        answer = best;

        console.log('answer', answer);
        return answer;
    }
}


function removeCharsAtIndex(s, from, amount) {
    return s.substring(0, from) + s.substring(from + amount);
}

module.exports = Day5;