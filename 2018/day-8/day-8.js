let Day = require('../../day.js');

class Day8 extends Day {
    constructor(callback) {
        super(callback);
        this.day = 8;
    }
    part1(input) {
        let answer;

        let tree = input.split(' ').map(val => parseInt(val));

        answer = calcNode(tree, 0).sum;

        return answer;
    }

    part2(input) {
        let answer;

        let tree = input.split(' ').map(val => parseInt(val));

        answer = calcNodeRef(tree, 0).sum;

        return answer;
    }
}

function calcNode(tree, index) {
    const childNodes = tree[index++];
    const metaDataEntries = tree[index++];

    let sum = 0;

    for (let i = 0; i < childNodes; i++) {
        let res = calcNode(tree, index++);
        index = res.index;
        sum += res.sum;
    }

    for (let i = 0; i < metaDataEntries; i++) {
        sum += tree[index++];
    }

    return { sum: sum, index: index };
}

function calcNodeRef(tree, index) {
    const childNodes = tree[index++];
    const metaDataEntries = tree[index++];

    let sum = 0;

    let children = [];
    if (childNodes > 0) {
        for (let i = 0; i < childNodes; i++) {
            let res = calcNodeRef(tree, index++);
            index = res.index;
            //sum += res.sum;
            children.push(res.sum);
        }
        for (let i = 0; i < metaDataEntries; i++) {
            var metaData = tree[index++];
            if (children[metaData - 1])
                sum += children[metaData - 1];
        }
    }
    else {
        for (let i = 0; i < metaDataEntries; i++) {
            sum += tree[index++];
        }
    }
    return { sum: sum, index: index };
}

module.exports = Day8;