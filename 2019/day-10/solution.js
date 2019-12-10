const { readInput } = require('../utilities.js');

const findAsteroids = (map) => {
    const asteroids = [];
    let counter = 0;
    for(let i = 0; i < map.length; i++)
    {
        for(let j = 0; j < map[i].length; j++)
        {
            if(map[i][j] === '#')
            {
                asteroids.push({id: counter++, x:j, y:i});
            }
        }
    }
    return asteroids;
}

const getAngle = (a, b) => {
    const angle = Math.atan2((b.y-a.y),(b.x - a.x));
    return angle * 180 / Math.PI;
}

const manhattan = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const partOne = (input) => {
    const map = input.split('\r\n').map(x=>x.split(''));
    
    const asteroids = findAsteroids(map);

    for(let a of asteroids)
    {
        let angles = [];
        for(let b of asteroids)
        {
            if(b.id === a.id)
                continue;

            angles.push(getAngle(a, b, map));
        }
        let uniqueAngles = [...new Set(angles)]; ;
        a.asteroidsInSight = uniqueAngles.length;
    }
    //console.log(asteroids);
    asteroids.sort((a,b) => b.asteroidsInSight - a.asteroidsInSight)
    return asteroids[0];
}

const partTwo = (input) => {
    const map = input.split('\r\n').map(x=>x.split(''));
    
    const asteroids = findAsteroids(map);
    const spaceStation = asteroids.find(x => x.id === 270);
    let angles = {};
    for(let b of asteroids)
    {
        if(b.id === spaceStation.id)
            continue;

        let angle = getAngle(spaceStation, b);

        b.distance = manhattan(spaceStation, b);

        if(!angles[angle])
            angles[angle] = [];

        angles[angle].push(b);
    }

    for(let key of Object.keys(angles))
    {
        angles[key].sort((a,b) => a.distance - b.distance);
        //console.log(key, angles[key]);
    }

    const sortedAngles = Object.keys(angles).sort((a,b) => b-a);
    //console.log(sortedAngles);

    // for(let key of sortedAngles)
    // {
    //     //angles[key].sort((a,b) => b.distance - a.distance);
    //     console.log(key, angles[key]);
    // }

    let start = 90;
    let startIndex = sortedAngles.indexOf('-90')
    //console.log(startIndex, sortedAngles[startIndex], angles[sortedAngles[startIndex]]);
    let asteroidsBlasted = [];
    while(asteroidsBlasted.length <= 200)
    {
        for(let i = startIndex; i !== (startIndex + 1); i--)
        {
            let angle = sortedAngles[i];
            let asteroids = angles[angle];
            // console.log(angle, asteroids, i, sortedAngles.length);
            //console.log(angle, i, sortedAngles.length);
            if(asteroids.length > 0)
            {
                asteroidsBlasted.push(asteroids.shift());
            }
            if(i === 0)
                i = sortedAngles.length - 1;
        }
    }

    asteroidsBlasted.map(x=>x.x+','+x.y).forEach(x => console.log(x));
    console.log(asteroidsBlasted[198])
    return asteroidsBlasted[198].x * 100 + asteroidsBlasted[198].y;
}

readInput(__dirname+'/input-1.txt', (err, input) => console.log(partOne(input)));
readInput(__dirname+'/input-2.txt', (err, input) => console.log(partTwo(input)));