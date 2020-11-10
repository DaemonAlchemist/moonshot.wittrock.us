import { objectId } from "the-reducer";
import { memoize } from "ts-functional";
import { G } from "./constants";
import { ICelestialBody, IVector, ISatellite, ISolverOptions } from "./sim";
import { Vector } from "./vector";

const GPrime = 2*Math.PI / Math.sqrt(G);

export const period = (p:ISatellite):number => GPrime * Math.sqrt(p.orbit.a * p.orbit.a * p.orbit.a / p.orbit.parent.attributes.mass);

export const abs2scr = (position:IVector, offset:IVector, zoom:number):IVector => Vector.apply((p, o) => o + p*zoom, position, offset);

// Solve an equation y = f(x) for x given a target y value via successive approximations
export const solve = (f:(n:number) => number, options:ISolverOptions) => {
    const maxSteps = options.maxSteps || 50;
    const maxDelta = options.maxDelta || 0.000001;
    const min = options.min || -10;
    const max = options.max || 10;

    let steps = 0;
    let curMin = min;
    let curMax = max;
    while(f(curMin) * f(curMax) > 0) {curMin*=2; curMax*=2;}
    let check = () => f((curMin + curMax) / 2);
    while(steps === 0 || (steps < maxSteps && Math.abs(check()) > maxDelta)) {
        const avg = (curMin + curMax) / 2;
        if(check() > 0.0) {curMax = avg;}
        else {curMin = avg;}
        steps++;
    }

    return (curMin + curMax) / 2;
}

const add = (a:number, b:number) => Math.pow(10, Math.log10(a))

// Source: https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion#Position_as_a_function_of_time
// TODO:  Memoize this based on planet object id and t if performance becomes an issue
const _getPosition = memoize((planet:ICelestialBody, t:number):IVector => {
    if(typeof planet.orbit === "undefined") {
        // There is only one sun:  the "planet" without an orbit
        return {x:0, y:0};
    } else {
        const s = planet as ISatellite;

        let M = (s.orbit.n || 1) * t + s.orbit.v0;
        if(M > Math.PI) {M = M - Math.floor(Math.PI / M) * Math.PI;}
        const f = (E:number) => E - s.orbit.e * Math.sin(E) - M;
        const E = solve(f, {max: M, min: M/2});

        const r = s.orbit.a * (1 - s.orbit.e * Math.cos(E));

        const parentPos = getPosition(s.orbit.parent, t);
        return {
            x: parentPos.x - r * (Math.cos(E) - s.orbit.e),
            y: parentPos.y + r * (Math.sqrt(1 - s.orbit.e * s.orbit.e) * Math.sin(E)),
        };
    }
}, {keyGen: ([p, t]) => `${objectId(p)}:${t}`});

export const getPosition = memoize(
    _getPosition,
    {keyGen: (args:[ICelestialBody, number]):string => `${objectId(args[0])}:${args[1]}`}
);