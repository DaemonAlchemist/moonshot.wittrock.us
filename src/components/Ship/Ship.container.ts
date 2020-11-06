import { connect } from 'react-redux';
import { deltaV, planet, ship, timer } from '../../util/redux';
import { IShip } from '../../util/sim';
import { ShipComponent } from './Ship.component';
import { IShipDispatchProps, IShipProps, IShipStateProps, ShipProps } from "./Ship.d";
import { tick } from './Ship.helpers';
import { last } from 'ts-functional';

// The mapStateToProps function:  Use this to fetch data from the Redux store via selectors
export const mapStateToProps = (state:any, props:IShipProps):IShipStateProps => ({
    flameOpacity: (() => {
        const time = timer.get(state).time;
        const deltaVs = deltaV.getMultiple(state, (d) => d.time < time);
        const sinceLastBurn = time - (last(deltaVs) || {time: -1000}).time;
        const burnLength = 10;
        return Math.max(0, (burnLength - sinceLastBurn) / burnLength);
    })(),
    ship: ship.get(state),
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