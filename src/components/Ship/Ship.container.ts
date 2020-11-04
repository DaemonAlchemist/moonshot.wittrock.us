import { connect } from 'react-redux';
import { ShipComponent } from './Ship.component';
import {IShipStateProps, IShipProps, IShipDispatchProps, ShipProps} from "./Ship.d";
import { ship, timer, planet } from '../../util/redux';
import { IShip, IPosition, ViewableCelestialObject } from '../../util/sim';

// The mapStateToProps function:  Use this to fetch data from the Redux store via selectors
export const mapStateToProps = (state:any, props:IShipProps):IShipStateProps => ({
    ship: ship.get(state),
    time: timer.get(state).time,
    planets: planet.getMultiple(state, () => true),
});

// The mapDispatchToProps function:  Use this to define handlers and dispatch basic actions
export const mapDispatchToProps = (dispatch:any, props:IShipProps):IShipDispatchProps => ({
    update: (s:IShip) => {
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
        const force = state.planets.reduce((force:IPosition, p:ViewableCelestialObject):IPosition => {
            // TODO: Add force from planets to velocity
            return force;
        }, {x: 0, y: 0});

        // Update velocity based on current forces
        const velocity:IPosition = {
            x: state.ship.velocity.x + force.x,
            y: state.ship.velocity.y + force.y,
        };

        // Update ship with new position and velocity
        dispatch.update({position, velocity});
    }
});

export const Ship = connect<IShipStateProps, IShipDispatchProps, IShipProps, ShipProps, any>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(ShipComponent);