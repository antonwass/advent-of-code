const { readInput } = require('../utilities.js');

const printOrbiters = (planet) =>{
    console.log(planet.id, planet.orbitedBy.map(o => o.id));
    planet.orbitedBy.forEach(orbiter => printOrbiters(orbiter))
}

const countOrbits = (planet, orbitCount) => {
    if(planet.orbits)
    {
        orbitCount.direct++;
        planet = planet.orbits;
        while(planet.orbits)
        {
            orbitCount.indirect++;
            planet = planet.orbits;
        }
    }
}

const buildPlanets = (orbits) => {
    let planets = orbits.reduce((prev, curr, index, planets) => {
        let a = curr.split(')')[0];
        let b = curr.split(')')[1];
        let planetA = planets.find(x => x.id === a);
        let planetB = planets.find(x => x.id === b);

        if(!planetB)
        {
            planetB = { id: b, orbitedBy:[]};
            planets.push(planetB);
        }
        if(!planetA)
        {
            planetA = { id: a, orbitedBy:[]};
            planets.push(planetA);
        }
        planetA.orbitedBy.push(planetB);
        planetB.orbits = planetA;
        return planets;
    }, []);
    return planets;
}

const partOne = (input) => {
    let orbits = input.split('\r\n');
    let planets = buildPlanets(orbits);
    // let com = planets.find(p => p.id === 'COM');
    let orbitCount = {direct:0, indirect:0};
    planets.forEach(p => countOrbits(p, orbitCount))
    return orbitCount.indirect +orbitCount.direct;
}

const findPathToCom = (p) => {
    let path = [];
    while(p.orbits)
    {
        path.push(p.orbits);
        p = p.orbits;
    }
    return path;
}

const findPathToPlanet = (planet, target) => {
    let path = [];
    while(planet.id !== target.id)
    {
        path.push(planet);
        planet = planet.orbits;
    }
    return path;
}

const partTwo = (input) => {
    let orbits = input.split('\r\n');
    let planets = buildPlanets(orbits);
    let you = planets.find(p => p.id === 'YOU');
    let san = planets.find(p => p.id === 'SAN');
    let pathToComForYou = findPathToCom(you);
    let pathToComForSan = findPathToCom(san);

    let commonPlanets = [];

    for(let planet of pathToComForYou)
    {
        if(pathToComForSan.find(p => p.id === planet.id))
        {
            commonPlanets.push(planet);
        }
    }
    let firstCommonPlanet = commonPlanets[0];

    let pathToCommonPlanetForYou = findPathToPlanet(you.orbits, firstCommonPlanet);
    let pathToCommonPlanetForSan = findPathToPlanet(san.orbits, firstCommonPlanet);

    let pathFromYouToSan = [...pathToCommonPlanetForSan, firstCommonPlanet,...(pathToCommonPlanetForYou.reverse())];
    //console.log(pathFromYouToSan.map(p => p.id));
    return pathFromYouToSan.length - 1;
}

readInput(__dirname + '/input-1.txt', (err, input) => console.log(partOne(input)));
readInput(__dirname + '/input-2.txt', (err, input) => console.log(partTwo(input)));