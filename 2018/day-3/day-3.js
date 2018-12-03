let Day = require('../../day.js');

class Day3 extends Day {
    constructor(callback) {
        super(callback);
        this.day = 3;
    }
    part1(input) {
        let answer = 0;
        const claims = input.split('\r\n');
        const fabric = {};

        claims.forEach(claim => {
            claim = claim.replace(':', '');
            const claimSplit = claim.split(' '); // 0 = id, 1 = junk, 2 = left/top, 3 = width/height
            const x = claimSplit[2].split(',')[0];
            const y = claimSplit[2].split(',')[1];
            const width = claimSplit[3].split('x')[0];
            const height = claimSplit[3].split('x')[1];

            for (let i = 0; i < width; i++) {
                for (let j = 0; j < height; j++) {
                    const key = (parseInt(x) + i) + ',' + (parseInt(y) + j)
                    //console.log(key);
                    if (fabric[key])
                        fabric[key]++;
                    else
                        fabric[key] = 1;
                }
            }


        });
        for (let key of Object.keys(fabric)) {
            //console.log(fabric[key])
            if (fabric[key] > 1) {
                answer++;
            }
        }
        console.log(answer);
        return answer;
    }

    part2(input) {
        let answer = 0;
        const claims = input.split('\r\n');
        const fabric = {};

        // mark the fabric with all claims
        claims.forEach(claim => {
            claim = claim.replace(':', '');
            const claimSplit = claim.split(' '); // 0 = id, 1 = junk, 2 = left/top, 3 = width/height
            const id = claimSplit[0];
            const x = claimSplit[2].split(',')[0];
            const y = claimSplit[2].split(',')[1];
            const width = claimSplit[3].split('x')[0];
            const height = claimSplit[3].split('x')[1];

            for (let i = 0; i < width; i++) {
                for (let j = 0; j < height; j++) {
                    const key = (parseInt(x) + i) + ',' + (parseInt(y) + j)
                    //console.log(key);
                    if (!fabric[key]) {
                        fabric[key] = [id];
                    }
                    else {
                        fabric[key].push(id);
                    }
                }
            }
        });
        
        // go through all claims to find the one that does not overlap
        claims.forEach(claim => {
            claim = claim.replace(':', '');
            const claimSplit = claim.split(' '); // 0 = id, 1 = junk, 2 = left/top, 3 = width/height
            const id = claimSplit[0];
            const x = claimSplit[2].split(',')[0];
            const y = claimSplit[2].split(',')[1];
            const width = claimSplit[3].split('x')[0];
            const height = claimSplit[3].split('x')[1];
            let candidate = true;
            for (let i = 0; i < width; i++) {
                for (let j = 0; j < height; j++) {
                    const key = (parseInt(x) + i) + ',' + (parseInt(y) + j)
                    if (fabric[key].length!==1) {
                        candidate = false;
                    }
                }
            }

            if(candidate){
                answer = id;
            }
        });
        return answer;
    }
}

module.exports = Day3;