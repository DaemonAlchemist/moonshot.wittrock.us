import { connect } from 'react-redux';
import { planet, timer } from '../../util/redux';
import { ViewableCelestialObject } from '../../util/sim';
import { GameComponent } from './Game.component';
import { GameProps, IGameDispatchProps, IGameProps, IGameStateProps } from "./Game.d";
import random from 'random';
import seedrandom from 'seedrandom';

// The mapStateToProps function:  Use this to fetch data from the Redux store via selectors
export const mapStateToProps = (state:any, props:IGameProps):IGameStateProps => ({
    timer: timer.get(state),
});

// The mapDispatchToProps function:  Use this to define handlers and dispatch basic actions
export const mapDispatchToProps = (dispatch:any, props:IGameProps):IGameDispatchProps => ({
    resetLevel: (level:number) => {
        // Clear and reset the old level
        console.log("Clearing old level");
        dispatch(planet.clear());
        dispatch(timer.update({time: 0, isRunning: true}));

        // Create sun
        console.log("Creating sun");
        const sun:ViewableCelestialObject = {
            id: "sun",
            attributes: {mass: 10, radius: 50, name: "Sun"},
            position: {x: 0, y: 0},
            view: {minViewSize: 4, borderColor: "ffff66", color: "ffffaa"}
        }
        console.log(sun);
        dispatch(planet.add(sun));

        // Create the planets
        random.use(seedrandom(`${level}`));

        const count:number = random.int(1, 10);
        console.log(`Planet count: ${count}`);
        for(let i=0; i<count; i++) {
            console.log(`Creating planet ${i}`);
            const id = `Planet ${i + 1}`;
            const mass = random.float(1, 5);
            const a = 75 * (i + 1);
            const p:ViewableCelestialObject = {
                id,
                attributes: {mass, radius: random.float(1,2) * mass, name: id},
                orbit: {parent: sun, e: random.float(0, 0.9), a, w: random.float(0, 6.28), v0: random.float(0, 6.28)},
                position: {x: 0, y: 0},
                view: {minViewSize: 2, borderColor: "6666ff", color: "aaaaff"}
            };
            console.log(p);
            dispatch(planet.add(p));
        }
    },
    tick: (time:number) => {
        dispatch(timer.update({time}));
    }
});

// The mergeProps function:  Use this to define handlers and dispatchers that require access to state props
export const mergeProps = (state:IGameStateProps, dispatch:IGameDispatchProps, props:IGameProps):GameProps => ({
    ...state,
    ...dispatch,
    ...props,
});

export const Game = connect<IGameStateProps, IGameDispatchProps, IGameProps, GameProps, any>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(GameComponent);