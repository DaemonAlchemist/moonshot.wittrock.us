import { connect } from 'react-redux';
import { memoize } from 'ts-functional';
import { dT } from '../../util/constants';
import { deltaV, game, planet, ship, timer } from '../../util/redux';
import { resetLevel } from '../../util/resetLevel';
import { IShip } from '../../util/sim';
import { tick } from '../Ship/Ship.helpers';
import { GameComponent } from './Game.component';
import { GameProps, IGameDispatchProps, IGameProps, IGameStateProps } from "./Game.d";

// The mapStateToProps function:  Use this to fetch data from the Redux store via selectors
export const mapStateToProps = (state:any, props:IGameProps):IGameStateProps => ({
    game: game.get(state),
    timer: timer.get(state),
    deltaVs: deltaV.getMultiple(state, () => true).sort((a, b) => a.time - b.time),
    ship: ship.get(state),
    planets: planet.getMultiple(state, () => true),
});

let curId = 0;
const getId = () => `${curId++}`;

// The mapDispatchToProps function:  Use this to define handlers and dispatch basic actions
export const mapDispatchToProps = (dispatch:any, props:IGameProps):IGameDispatchProps => ({
    addDeltaV: (time:number) => () => {
        dispatch(deltaV.add({id: getId(), time, deltaV: 0, angle: 0}));
    },
    onChangeDeltaV: (id:string, field:string) => (value?:string | number) => {
        dispatch(deltaV.update({id, [field]: value ? +value : 0}));
    },
    onDeleteDeltaV: (id:string) => () => {
        dispatch(deltaV.delete(id));
    },
    resetLevel:memoize(() => (level:number) => {
        const {planets, newShip, startId, targetId} = resetLevel(level);

        // Clear and reset the old level
        dispatch(timer.update({time: 0, steps: 1, dT}));
        dispatch(planet.clear());
        dispatch(planet.addMultiple(planets));
        dispatch(ship.update(newShip));
        dispatch(game.update({startId, targetId}));
    }, {})(),
    updateShip: (s:Partial<IShip>) => {
        dispatch(ship.update(s));
    },
    updateSpeed: (steps:number) => () => {
        dispatch(timer.update({steps}));
    },
    updateTime: (time:number) => {
        dispatch(timer.update({time}));
    },
});

// The mergeProps function:  Use this to define handlers and dispatchers that require access to state props
export const mergeProps = (state:IGameStateProps, dispatch:IGameDispatchProps, props:IGameProps):GameProps => ({
    ...state,
    ...dispatch,
    ...props,
    tick: () => {
        const newShip = tick(state.ship, state.planets, state.deltaVs, state.timer);
        dispatch.updateTime(state.timer.time + state.timer.steps * state.timer.dT);
        dispatch.updateShip(newShip);
    }
});

export const Game = connect<IGameStateProps, IGameDispatchProps, IGameProps, GameProps, any>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(GameComponent);