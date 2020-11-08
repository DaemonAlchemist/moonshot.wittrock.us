import random from 'random';
import seedrandom from 'seedrandom';
import { ViewableCelestialObject } from "./sim";

const getNewSun = ():ViewableCelestialObject => ({
    id: "sun",
    attributes: {mass: 100, radius: 30, name: "Sun"},
    view: {minViewSize: 20, borderColor: "ffff66", color: "ffffaa"}
});

const getNewPlanet = (sun:ViewableCelestialObject, i:number):ViewableCelestialObject[] => {
    const id = `Planet ${i + 1}`;
    const mass = random.float(1, 5);
    const a = sun.attributes.radius + 75 * (i + 1);
    const p:ViewableCelestialObject = {
        id,
        attributes: {mass, radius: random.float(1, 5) * mass, name: id},
        orbit: {parent: sun, e: random.float(0, 0.9), a, w: random.float(0, 6.28), v0: random.float(0, 6.28)},
        view: {minViewSize: 10, borderColor: "6666ff", color: "aaaaff"}
    };

    const moons:number = random.int(0, 3);

    const bodies = [p];
    for(let j=0; j<moons; j++) {
        const moonId = `Planet ${i + 1}, Moon ${j + 1}`;
        const moonMass = random.float(0.01 * mass, 0.2 * mass);
        const a = p.attributes.radius + 7.5 * (i + 1);
        const m:ViewableCelestialObject = {
            id: moonId,
            attributes: {mass: moonMass, radius: random.float(0.1, 0.5) * moonMass, name: moonId},
            orbit: {parent: p, e: random.float(0, 0.9), a, w: random.float(0, 6.28), v0: random.float(0, 6.28)},
            view: {minViewSize: 1, borderColor: "66ff66", color: "aaffaa"}
        };
        bodies.push(m);
    }

    return bodies;
}

// Perform a seeded random shuffle on a planetery array
const shuffle = (seed:number, arr:ViewableCelestialObject[]):ViewableCelestialObject[] => arr.sort((a, b) => {
    random.use(seedrandom(`${seed}:${a.id}`));
    const aVal = random.int(0, 1000000);
    random.use(seedrandom(`${seed}:${b.id}`));
    const bVal = random.int(0, 1000000);
    console.log(`a: ${a.id}:${aVal}, b: ${b.id}:${bVal}`);
    return aVal - bVal;
});

export const resetLevel = (level:number) => {
    // List all bodies in the system
    let planets:ViewableCelestialObject[] = [];

    // Seed the random number generator with the level number
    random.use(seedrandom(`${level}`));

    // Create the sun
    const sun:ViewableCelestialObject = getNewSun();
    planets.push(sun);

    // Create the planets
    const count:number = random.int(1, 10);

    for(let i=0; i<count; i++) {
        const newPlanets = getNewPlanet(sun, i);
        planets = planets.concat(newPlanets);
    }

    // Choose a starting and target body
    planets = shuffle(random.int(0, 1000000), planets);
    const start = planets[0];
    const target = planets[1];

    // TODO: Set the initial ship position and velocity around the start planet
    const newShip = {
        initialPosition: {x: 0, y:100},
        initialVelocity: {x: 1, y:0},
        position: {x: 0, y: 100},
        velocity: {x: 1, y: 0},
    };
    
    return {planets, newShip, start, target};
}
