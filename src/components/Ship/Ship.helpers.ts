import { IShip, ICelestialBody, IDeltaV, IVector, ITimer } from "../../util/sim";
import { getPosition } from "../../util/orbit";
import { G } from "../../util/constants";
import { Vector } from "../../util/vector";

const gravityForce = (position:IVector, planets:ICelestialBody[], t:number) => {
    return planets.reduce((totalForce:IVector, p:ICelestialBody):IVector => {
        // Add force from planets to velocity
        const pPos = getPosition(p, t);
        const dir = Vector.sub(pPos, position);
        const l = Vector.len(dir);

        const f = G * p.attributes.mass / (l*l);
        return Vector.apply((t, d) => t + f * d / l, totalForce, dir);
    }, {x: 0, y: 0});

}

// Update the position and velocity via Runge-Kutta integration:  http://spiff.rit.edu/richmond/nbody/OrbitRungeKutta4.pdf
// Note that there is an error in the source:  In equation 10, vi should be ADDED to the k expressions, not multiplied
const rk4 = (p0:IVector, v0:IVector, planets:ICelestialBody[], t:number, dT:number):[IVector, IVector] => {
    const a1 = gravityForce(p0, planets, t);
    const v1 = v0;

    const a2 = gravityForce(Vector.apply((p, v) => p + v * dT/2, p0, v1), planets, t + dT/2);
    const v2 = Vector.apply((v, a) => v + a * dT/2, v0, a1);

    const a3 = gravityForce(Vector.apply((p, v) => p + v * dT/2, p0, v2), planets, t + dT/2);
    const v3 = Vector.apply((v, a) => v + a * dT/2, v0, a2);

    const a4 = gravityForce(Vector.apply((p, v) => p + v * dT  , p0, v3), planets, t + dT  );
    const v4 = Vector.apply((v, a) => v + a * dT  , v0, a3);

    const vNext = Vector.apply((v, a1, a2, a3, a4) => v + dT/6 * (a1 + 2*a2 + 2*a3 + a4), v0, a1, a2, a3, a4);
    const pNext = Vector.apply((p, v1, v2, v3, v4) => p + dT/6 * (v1 + 2*v2 + 2*v3 + v4), p0, v1, v2, v3, v4);

    return [pNext, vNext];
}

export const tick = (ship:IShip, planets:ICelestialBody[], deltaVs:IDeltaV[], timer:ITimer):IShip => {
        let position = {...ship.position};
        let velocity = {...ship.velocity};
        const dT = timer.dT;

        for(let i=0; i<Math.max(1, timer.steps); i++) {
            const time = timer.time + i * dT;

            // Update the position and velocity via Runge Kutta integration
            const [p, v] = rk4(position, velocity, planets, time, dT);
            position = p;
            velocity = v;

            // Update velocity with any delta-Vs
            const matchingDeltaV = deltaVs.filter(d => d.time === time);
            if(matchingDeltaV.length > 0) {
                const deltaV = matchingDeltaV[0];
                velocity.x += deltaV.deltaV * Math.cos(deltaV.angle) * 1000;
                velocity.y += deltaV.deltaV * Math.sin(deltaV.angle) * 1000;
            }
        }

        // Update ship with new position and velocity
        return {...ship, position, velocity};
}