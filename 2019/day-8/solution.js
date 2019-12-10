const { readInput } = require('../utilities.js');

const countDigits = (layer, digit) => layer.filter(a => a === digit).length;

const decodeImage = (rawImage, width, height) => {
    let layers = [];
    let pointer = 0;
    while(pointer < rawImage.length)
    {
        const layer = [];
        for(let i = 0; i < height; i++)
        {
            let row = [];
            for(let j = 0; j < width; j++)
            {
                row.push(rawImage[pointer++]);
            }
            layer.push(row);
        }
        layers.push(layer);
    }
    return layers;
}

const partOne = (rawImage) => {
    const width = 25;
    const height = 6;

    let layers = [];
    let pointer = 0;
    while(pointer < rawImage.length)
    {
        const layer = [];
        for(let i = 0; i < height; i++)
        {
            //let row = [];
            for(let j = 0; j < width; j++)
            {
                layer.push(rawImage[pointer++]);
            }
            //layer.push(row);
        }
        layers.push(layer);
    }
    //console.log(layers);

    layers = layers.sort((a,b) => countDigits(a, '0') - countDigits(b, '0'));
    //console.log(layers);
    //console.log(layers.map(layer => countDigits(layer, '0')));
    let numberOfOneDigits = countDigits(layers[0], '1');
    let numberOfTwoDigits = countDigits(layers[0], '2');
    //console.log(numberOfOneDigits, numberOfTwoDigits);
    return numberOfOneDigits * numberOfTwoDigits
}

const partTwo = (input) => {
    const width = 25;
    const height = 6;

    let layers = decodeImage(input, width, height);

    let finalLayer = [];

    for(let i = 0; i < height; i++)
    {
        let row = [];
        for(let j = 0; j < width; j++)
        {
            let pixel;
            for(let layer of layers)
            {
                if(!pixel)
                    pixel = layer[i][j];
                else if(pixel == '2')
                {
                    pixel = layer[i][j];
                }
            }
            row.push(pixel === '0' ? ' ' : '1');
        }
        finalLayer.push(row);
    }
    finalLayer.forEach(row => console.log(row.join('')));
    return "look at the output";
}

readInput(__dirname+'/input-1.txt', (err, input) => console.log(partOne(input)));
readInput(__dirname+'/input-2.txt', (err, input) => console.log(partTwo(input)));