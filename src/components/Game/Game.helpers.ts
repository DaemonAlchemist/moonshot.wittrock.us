import { ViewableCelestialObject } from "../../util/sim";
import random from 'random';

export const getNewSun = ():ViewableCelestialObject => ({
    id: "sun",
    attributes: {mass: 100, radius: 30, name: "Sun"},
    view: {minViewSize: 20, borderColor: "ffff66", color: "ffffaa"}
});

export const getNewPlanet = (sun:ViewableCelestialObject, i:number):ViewableCelestialObject[] => {
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
    console.log(`Moon count: ${moons}`);

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