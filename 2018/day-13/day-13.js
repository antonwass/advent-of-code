let Day = require('../../day.js');

class Day13 extends Day {
    constructor(callback) {
        super(callback);
        this.day = 13;
    }
    part1(input) {
        let answer;
        let rows = input.split('\r\n');
        let track = []
        let carts = [];
        let cartIdCounter = 0;

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let col = [];
            for (let j = 0; j < row.length; j++) {
                let char = row.charAt(j);
                col.push(char);
            }
            track.push(col);
        }

        for (let i = 0; i < track.length; i++) {
            let trackRow = track[i];
            for (let j = 0; j < track[0].length; j++) {
                let char = trackRow[j];
                if (char === 'v'
                    || char === '<'
                    || char === '^'
                    || char === '>') {
                    let cart = {
                        nextTurn: '<',
                        direction: char,
                        x: j,
                        y: i,
                        id: cartIdCounter++
                    };
                    if (char === 'v' || char === '^')
                        char = '|'
                    else if (char === '<' || char === '>')
                        char = '-'

                    carts.push(cart);
                    trackRow[j] = char;
                }
            }
        }


        carts.sort(sortCarts);
        let collision = false;
        let done = false;
        while (!done) {
            //for (let iteration = 0; iteration < 5; iteration++) {

            for (let cart of carts) {
                // if(collision)
                //     continue;
                let cartPosType = track[cart.y][cart.x];
                // console.log('cart', cart, cartPosType);
                if (cartPosType === '-') {
                    //console.log('horizontal', cart);
                    if (cart.direction === '>')
                        cart.x++;
                    else
                        cart.x--;
                }
                else if (cartPosType === '|') {
                    if (cart.direction === '^')
                        cart.y--;
                    else
                        cart.y++;
                }
                else if (cartPosType === '/') {
                    if (cart.direction === '^') {
                        cart.direction = '>'
                        cart.x++;
                    } else if (cart.direction === '<') {
                        cart.direction = 'v';
                        cart.y++;
                    } else if (cart.direction === 'v') {
                        cart.direction = '<';
                        cart.x--;
                    } else if (cart.direction === '>') {
                        cart.direction = '^';
                        cart.y--;
                    }
                }
                else if (cartPosType === '\\') {
                    if (cart.direction === '^') {
                        cart.direction = '<'
                        cart.x--;
                    }
                    else if (cart.direction === '>') {
                        cart.direction = 'v'
                        cart.y++;
                    } else if (cart.direction === 'v') {
                        cart.direction = '>';
                        cart.x++;
                    } else if (cart.direction === '<') {
                        cart.direction = '^';
                        cart.y--;
                    }

                } else if (cartPosType === '+') {
                    switch (cart.nextTurn) {
                        case '<':
                            switch (cart.direction) {
                                case 'v':
                                    cart.x++;
                                    cart.direction = '>';
                                    break;
                                case '^':
                                    cart.x--;
                                    cart.direction = '<';
                                    break;
                                case '>':
                                    cart.y--;
                                    cart.direction = '^';
                                    break;
                                case '<':
                                    cart.y++;
                                    cart.direction = 'v'
                                    break;
                            }
                            break;
                        case '|':
                            switch (cart.direction) {
                                case 'v':
                                    cart.y++;
                                    break;
                                case '^':
                                    cart.y--;
                                    break;
                                case '>':
                                    cart.x++;
                                    break;
                                case '<':
                                    cart.x--;
                                    break;
                            }
                            break;
                        case '>':
                            switch (cart.direction) {
                                case 'v':
                                    cart.x--;
                                    cart.direction = '<';
                                    break;
                                case '^':
                                    cart.x++;
                                    cart.direction = '>';
                                    break;
                                case '>':
                                    cart.y++;
                                    cart.direction = 'v';
                                    break;
                                case '<':
                                    cart.y--;
                                    cart.direction = '^'
                                    break;
                            }
                            break;
                    }
                    calcNextTurn(cart);
                    //console.log(carts);
                    //console.log(carts.length);

                    //printTrack(track, carts);
                }

                findCollision(carts)
            }
            // console.log('carts', carts)

            if (carts.length === 1) {
                done = true;
            }

            //console.log('before delete', carts);
            carts = carts.filter(cart => !cart.crashed);
            //console.log('after delete', carts);


            carts.sort(sortCarts);
            //console.log('end of tick')
            // printTrack(track, carts);

            // console.log('iteration', iteration)
            // console.log(carts);
            //printTrack(track, carts);
            process.stdout.write("\x1B[2J")//.write('\033c');
            printTrack(track, carts);
        }

        //console.log(carts);
        //console.log(carts);

        //printTrack(track, carts);

        return answer;
    }

    part2(input) {
        let answer;

        return answer;
    }
}


function findCollision(carts) {
    let collisions = [];
    for (let i = 0; i < carts.length; i++) {
        for (let j = 0; j < carts.length; j++) {
            if (i === j || carts[i].crashed || carts[j].crashed) {

            }
            else if (carts[i].x === carts[j].x && carts[i].y === carts[j].y) {
                console.log('collision!', carts[i].x, carts[i].y, carts.length);
                collisions.push(i, j);
                // carts[i].crashed = true;
                // carts[j].crashed = true;

                //return true;
            }
        }
    }

    // collisions = collisions.sort().reverse();
    // console.log('before', carts);
    // if (collisions.length > 0)
    //     console.log('collisions!', collisions);
    // for (let col of collisions) {
    //     carts.splice(col, 1); // part 2
    // }
    // console.log('after', carts);
    for (let col of collisions) {
        carts[col].crashed = true;
    }
    return carts;
}

function calcNextTurn(cart) {
    switch (cart.nextTurn) {
        case '<':
            cart.nextTurn = '|';
            break;
        case '|':
            cart.nextTurn = '>';
            break;
        case '>':
            cart.nextTurn = '<';
            break;
    }
}

function isDef(char) {
    return char && char !== ' ';
}

function sortCarts(a, b) {
    if (a.y === b.y)
        return a.x - b.x
    else
        return a.y - b.y
}


function printTrack(track, carts) {
    // print track
    let trackCopy = track.slice();
    for (let i = 0; i < trackCopy.length; i++) {
        let row = trackCopy[i].slice();
        for (let cart of carts) {
            if (cart.y === i) {
                //console.log('match', cart.x, cart.y)
                row[cart.x] = cart.direction;
            }
        }
        console.log(row.join(''));
    }
}

module.exports = Day13;