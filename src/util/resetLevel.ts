import random from 'random';
import seedrandom from 'seedrandom';
import { ViewableCelestialObject, IVector, ISatellite } from "./sim";
import { getPosition, period } from './orbit';
import { rSun, dGasGiant, rJupiter, rEarth, dRock, aEarth } from './constants';
import { getMass, sci, orbitalSpeed } from './util';
import { Vector } from './vector';

const getNewSun = ():ViewableCelestialObject => {
    const radius = random.float(0.3, 10) * rSun;
    const mass = random.float(0.9, 1.1) * getMass(radius, dGasGiant);
    return {
        id: "sun",
        attributes: {mass, radius, name: "Sun"},
        view: {minViewSize: 20, borderColor: "ffff66", color: "ffffaa"}
    };
}

const getNewPlanet = (sun:ViewableCelestialObject, i:number):ViewableCelestialObject[] => {
    const id = `Planet ${i + 1}`;
    const isGasGiant = random.bool();
    const radius = random.float(0.2, 2) * (isGasGiant ?  rJupiter : rEarth);
    const mass = random.float(0.8, 1.2) * getMass(radius, isGasGiant ? dGasGiant : dRock);
    const a = sun.attributes.radius + aEarth / 3 * (i + 1) * random.float(0.8, 1.2);
    const p:ViewableCelestialObject = {
        id,
        attributes: {mass, radius, name: id},
        orbit: {parent: sun, e: random.float(0, 0.9), a, w: random.float(0, 6.28), v0: random.float(0, 6.28)},
        view: {minViewSize: 10, borderColor: "6666ff", color: "aaaaff"}
    };
    (p as ISatellite).orbit.period = period(p as ISatellite);
    (p as ISatellite).orbit.n = 2 * Math.PI / period(p as ISatellite);

    const moons:number = random.int(0, 3);

    const bodies = [p];
    for(let j=0; j<moons; j++) {
        const moonId = `Planet ${i + 1}, Moon ${j + 1}`;
        const moonRadius = random.float(0.01, 0.3) * radius;
        const moonMass = random.float(0.8, 1.2) * getMass(moonRadius, dRock);
        const a = p.attributes.radius + sci(1, 6) * (i + 1) * random.float(0.8, 1.2);
        const m:ViewableCelestialObject = {
            id: moonId,
            attributes: {mass: moonMass, radius: moonRadius, name: moonId},
            orbit: {parent: p, e: random.float(0, 0.9), a, w: random.float(0, 6.28), v0: random.float(0, 6.28)},
            view: {minViewSize: 1, borderColor: "66ff66", color: "aaffaa"}
        };
        (m as ISatellite).orbit.period = period(m as ISatellite);
        (m as ISatellite).orbit.n = 2 * Math.PI / period(m as ISatellite);
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
    const startPlanetPosition = getPosition(start, 0);
    const orbitalHeight = start.attributes.radius * 1.2;
    const initialPosition = {
        x: startPlanetPosition.x,
        y: startPlanetPosition.y + orbitalHeight,
    }
    const startPlanetVelocity = Vector.sub(getPosition(start, 1), startPlanetPosition);
    const shipVelocity:IVector = Vector.add(startPlanetVelocity, {
        x: orbitalSpeed(start.attributes.mass, orbitalHeight),
        y: 0
    });

    const newShip = {
        initialPosition,
        initialVelocity: shipVelocity,
        position: initialPosition,
        velocity: shipVelocity,
    };
    
    return {planets, newShip, startId: start.id, targetId: target.id};
}
