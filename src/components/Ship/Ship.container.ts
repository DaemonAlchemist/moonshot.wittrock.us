import { connect } from 'react-redux';
import { deltaV, planet, ship, timer } from '../../util/redux';
import { IShip } from '../../util/sim';
import { ShipComponent } from './Ship.component';
import { IShipDispatchProps, IShipProps, IShipStateProps, ShipProps } from "./Ship.d";
import { tick } from './Ship.helpers';

// The mapStateToProps function:  Use this to fetch data from the Redux store via selectors
export const mapStateToProps = (state:any, props:IShipProps):IShipStateProps => ({
    deltaVs: deltaV.getMultiple(state, () => true),
    ship: ship.get(state),
    timer: timer.get(state),
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
});

export const Ship = connect<IShipStateProps, IShipDispatchProps, IShipProps, ShipProps, any>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(ShipComponent);