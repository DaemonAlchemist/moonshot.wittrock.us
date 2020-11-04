import random from 'random';
import { connect } from 'react-redux';
import seedrandom from 'seedrandom';
import { memoize } from 'ts-functional';
import { planet, timer } from '../../util/redux';
import { ViewableCelestialObject } from '../../util/sim';
import { GameComponent } from './Game.component';
import { GameProps, IGameDispatchProps, IGameProps, IGameStateProps } from "./Game.d";
import { getNewPlanet, getNewSun } from './Game.helpers';

// The mapStateToProps function:  Use this to fetch data from the Redux store via selectors
export const mapStateToProps = (state:any, props:IGameProps):IGameStateProps => ({
    timer: timer.get(state),
});

// The mapDispatchToProps function:  Use this to define handlers and dispatch basic actions
export const mapDispatchToProps = (dispatch:any, props:IGameProps):IGameDispatchProps => ({
    resetLevel:memoize(() => (level:number) => {
        // Clear and reset the old level
        console.log("Clearing old level");
        dispatch(planet.clear());
        dispatch(timer.update({time: 0, isRunning: true}));

        // Seed the random number generator with the level number
        random.use(seedrandom(`${level}`));

        // Create the sun
        console.log("Creating sun");
        const sun:ViewableCelestialObject = getNewSun();
        console.log(sun);
        dispatch(planet.add(sun));

        // Create the planets
        const count:number = random.int(1, 10);
        console.log(`Planet count: ${count}`);

        for(let i=0; i<count; i++) {
            dispatch(planet.addMultiple(getNewPlanet(sun, i)));
        }
    }, {})(),
    reset: () => {
        dispatch(timer.update({time: 0}));
    },
    updateTime: (time:number) => {
        dispatch(timer.update({time}));
    }
});

// The mergeProps function:  Use this to define handlers and dispatchers that require access to state props
export const mergeProps = (state:IGameStateProps, dispatch:IGameDispatchProps, props:IGameProps):GameProps => ({
    ...state,
    ...dispatch,
    ...props,
    tick: (dt:number) => {
        dispatch.updateTime(state.timer.time + dt);
    }
});

export const Game = connect<IGameStateProps, IGameDispatchProps, IGameProps, GameProps, any>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(GameComponent);