import { connect } from 'react-redux';
import { first, last } from 'ts-functional';
import { deltaV, ship, timer } from '../../util/redux';
import { IShip } from '../../util/sim';
import { ShipComponent } from './Ship.component';
import { IShipDispatchProps, IShipProps, IShipStateProps, ShipProps } from "./Ship.d";
import { dT, baseSpeed } from '../../util/constants';

// The mapStateToProps function:  Use this to fetch data from the Redux store via selectors
export const mapStateToProps = (state:any, props:IShipProps):IShipStateProps => ({
    angle: (() => {
        const time = timer.get(state).time;
        const curDeltaV = first(deltaV.getMultiple(state, (d) => d.time === time));
        if(!!curDeltaV) {return curDeltaV.angle;}
        const prevDeltaV = last(deltaV.getMultiple(state, (d) => d.time < time));
        const nextDeltaV = first(deltaV.getMultiple(state, (d) => d.time > time));
        const prevAngle = !!prevDeltaV ? prevDeltaV.angle : 0;
        const prevTime = !!prevDeltaV ? prevDeltaV.time : 0;
        const nextAngle = !!nextDeltaV ? nextDeltaV.angle : 0;
        const nextTime = !!nextDeltaV ? nextDeltaV.time : 999999;
        const pct = (time - prevTime) / (nextTime - prevTime);
        return pct * (nextAngle - prevAngle) + prevAngle;
    })(),
    flameOpacity: (() => {
        const time = timer.get(state).time;
        const prevDeltaV = last(deltaV.getMultiple(state, (d) => d.time < time));
        const sinceLastBurn = prevDeltaV ? time - prevDeltaV.time : 1000;
        const burnLength = baseSpeed;
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