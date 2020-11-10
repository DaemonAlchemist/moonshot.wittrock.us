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

export const tick = (ship:IShip, planets:ICelestialBody[], deltaVs:IDeltaV[], timer:ITimer):IShip => {
        const startTime = Date.now();
        let position = {...ship.position};
        let velocity = {...ship.velocity};
        const dT = timer.dT;

        for(let i=0; i<Math.max(1, timer.steps); i++) {
            const time = timer.time + i * dT;

            // Add the gravitational forces from the planets
            const force = gravityForce(position, planets, time);

            // Update the ship's position based on last velocity
            position = Vector.apply((p, v, f) => p + v * dT + f / 2 * dT * dT, position, velocity, force);

            // Update velocity based on current forces
            velocity = Vector.apply((v, f) => v + f * dT, velocity, force);


            // Update velocity with any delta-Vs
            const matchingDeltaV = deltaVs.filter(d => d.time === time);
            if(matchingDeltaV.length > 0) {
                const deltaV = matchingDeltaV[0];
                velocity.x += deltaV.deltaV * Math.cos(deltaV.angle);
                velocity.y += deltaV.deltaV * Math.sin(deltaV.angle);
            }
        }

        const endTime = Date.now();

        // Update ship with new position and velocity
        return {...ship, position, velocity};
}