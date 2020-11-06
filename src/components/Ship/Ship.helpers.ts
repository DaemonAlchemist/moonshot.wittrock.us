import { IShip, ICelestialBody, IDeltaV, IPosition } from "../../util/sim";
import { getPosition, G } from "../../util/orbit";

export const tick = (ship:IShip, planets:ICelestialBody[], deltaVs:IDeltaV[], baseTime:number, steps:number):IShip => {
        let position = {...ship.position};
        let velocity = {...ship.velocity};

        for(let i=0; i<steps; i++) {
            const time = baseTime + i;

            // Add the gravitational forces from the planets
            const force = planets.reduce((totalForce:IPosition, p:ICelestialBody):IPosition => {
                // Add force from planets to velocity
                const pPos = getPosition(p, time);
                const dir:IPosition = {
                    x: pPos.x - position.x,
                    y: pPos.y - position.y,
                };
                const d = Math.sqrt(dir.x * dir.x + dir.y * dir.y);

                const f = G * p.attributes.mass / (d*d);
                return {
                    x: totalForce.x + f * dir.x / d,
                    y: totalForce.y + f * dir.y / d,
                }
            }, {x: 0, y: 0});

            // Update the ship's position based on last velocity
            position.x += velocity.x;
            position.y += velocity.y;

            // Update velocity based on current forces
            velocity.x += force.x;
            velocity.y += force.y;

            // Update velocity with any delta-Vs
            const matchingDeltaV = deltaVs.filter(d => d.time === time);
            if(matchingDeltaV.length > 0) {
                const deltaV = matchingDeltaV[0];
                velocity.x += deltaV.deltaV * Math.cos(deltaV.angle);
                velocity.y += deltaV.deltaV * Math.sin(deltaV.angle);
            }
        }

        // Update ship with new position and velocity
        return {...ship, position, velocity};
}