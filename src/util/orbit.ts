import { CelestialBody, IPosition, Satellite, ISatellite, CentralBody, ISolverOptions } from "./sim";

const G = 1.0;
const GPrime = 2*Math.PI / Math.sqrt(G);

export const period = (p:Satellite):number => GPrime * Math.sqrt(p.orbit.a * p.orbit.a * p.orbit.a / p.orbit.parent.attributes.mass);

// Solve an equation y = f(x) for x given a target y value via successive approximations
export const solve = (target:number, f:(n:number) => number, options:ISolverOptions) => {
    const maxSteps = options.maxSteps || 10;
    const maxDelta = options.maxDelta || 0.000001;
    const dX = options.dX || 0.0000001;

    let steps = 0;
    let delta = 0;
    let curGuess = options.initialValue || 1;
    while(steps === 0 || (steps < maxSteps && Math.abs(delta) > maxDelta)) {
        const curVal = f(curGuess);
        delta = target - curVal;
        const dF = (f(curGuess + dX) - curVal) / dX;
        curGuess = curGuess + 0.75 * (target - curVal) / dF;
        steps++;
    }

    return curGuess;
}

// Source: https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion#Position_as_a_function_of_time
// TODO:  Memoize this based on planet object id and t
export const getPosition = (planet:CelestialBody, t:number):IPosition => {
    if(typeof (planet as ISatellite).orbit === "undefined") {
        return (planet as CentralBody).position;
    } else {
        const s = planet as Satellite;

        const p = period(s);
        const n = 2*Math.PI / p;
        let M = n * t + s.orbit.v0;
        while(M > Math.PI) {M-= 2*Math.PI;}
        const f = (E:number) => E - s.orbit.e * Math.sin(E);
        const E = solve(M, f, {});

        const sinV = Math.sqrt(1 - s.orbit.e * s.orbit.e) * Math.sin(E);
        const cosV = Math.cos(E) - s.orbit.e;
        const v = Math.atan2(sinV, cosV);

        const r = s.orbit.a * (1 - s.orbit.e * Math.cos(E));

        const parentPos = getPosition(s.orbit.parent, t);
        return {
            x: parentPos.x - r * Math.cos(v),
            y: parentPos.y + r * Math.sin(v),
        };
    }
}