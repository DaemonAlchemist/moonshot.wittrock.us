import { connect } from 'react-redux';
import { G } from '../../util/orbit';
import { deltaV, planet, ship, timer } from '../../util/redux';
import { IPosition, IShip, ViewableCelestialObject } from '../../util/sim';
import { ShipComponent } from './Ship.component';
import { IShipDispatchProps, IShipProps, IShipStateProps, ShipProps } from "./Ship.d";

// The mapStateToProps function:  Use this to fetch data from the Redux store via selectors
export const mapStateToProps = (state:any, props:IShipProps):IShipStateProps => ({
    deltaVs: deltaV.getMultiple(state, () => true),
    ship: ship.get(state),
    time: timer.get(state).time,
    planets: planet.getMultiple(state, () => true),
});

// The mapDispatchToProps function:  Use this to define handlers and dispatch basic actions
export const mapDispatchToProps = (dispatch:any, props:IShipProps):IShipDispatchProps => ({
    update: (s:Partial<IShip>) => {
        dispatch(ship.update(s));
    }
});

// The mergeProps function:  Use this to define handlers and dispatchers that require access to state props
export const mergeProps = (state:IShipStateProps, dispatch:IShipDispatchProps, props:IShipProps):ShipProps => ({
    ...state,
    ...dispatch,
    ...props,
    tick: () => {
        // Update the ship's position based on last velocity
        const position:IPosition = {
            x: state.ship.position.x + state.ship.velocity.x,
            y: state.ship.position.y + state.ship.velocity.y,
        }

        // Add the gravitational forces from the planets
        const force = state.planets.reduce((totalForce:IPosition, p:ViewableCelestialObject):IPosition => {
            // Add force from planets to velocity
            const dir:IPosition = {
                x: p.position.x - state.ship.position.x,
                y: p.position.y - state.ship.position.y,
            };
            const d = Math.sqrt(dir.x * dir.x + dir.y * dir.y);

            const f = G * p.attributes.mass / (d*d);
            return {
                x: totalForce.x + f * dir.x / d,
                y: totalForce.y + f * dir.y / d,
            }
        }, {x: 0, y: 0});

        // Update velocity based on current forces
        let velocity:IPosition = {
            x: state.ship.velocity.x + force.x,
            y: state.ship.velocity.y + force.y,
        };

        // Update velocity with any delta-Vs
        const matchingDeltaV = state.deltaVs.filter(d => d.time === state.time);
        if(matchingDeltaV.length > 0) {
            const deltaV = matchingDeltaV[0];
            velocity.x += deltaV.deltaV * Math.cos(deltaV.angle);
            velocity.y += deltaV.deltaV * Math.sin(deltaV.angle);
        }

        // Update ship with new position and velocity
        dispatch.update({position, velocity});
    }
});

export const Ship = connect<IShipStateProps, IShipDispatchProps, IShipProps, ShipProps, any>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(ShipComponent);