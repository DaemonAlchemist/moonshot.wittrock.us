import random from 'random';
import { connect } from 'react-redux';
import seedrandom from 'seedrandom';
import { memoize } from 'ts-functional';
import { planet, timer, ship, deltaV } from '../../util/redux';
import { ViewableCelestialObject } from '../../util/sim';
import { GameComponent } from './Game.component';
import { GameProps, IGameDispatchProps, IGameProps, IGameStateProps } from "./Game.d";
import { getNewPlanet, getNewSun } from './Game.helpers';

// The mapStateToProps function:  Use this to fetch data from the Redux store via selectors
export const mapStateToProps = (state:any, props:IGameProps):IGameStateProps => ({
    timer: timer.get(state),
    deltaVs: deltaV.getMultiple(state, () => true).sort((a, b) => a.time - b.time),
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
        // Clear and reset the old level
        console.log("Clearing old level");
        dispatch(planet.clear());
        dispatch(timer.update({time: 0}));

        // List all bodies in the system
        const bodies:ViewableCelestialObject[] = [];

        // Seed the random number generator with the level number
        random.use(seedrandom(`${level}`));

        // Create the sun
        console.log("Creating sun");
        const sun:ViewableCelestialObject = getNewSun();
        bodies.push(sun);
        console.log(sun);
        dispatch(planet.add(sun));

        // Create the planets
        const count:number = random.int(1, 10);
        console.log(`Planet count: ${count}`);

        for(let i=0; i<count; i++) {
            const newPlanets = getNewPlanet(sun, i);
            bodies.concat(newPlanets);
            dispatch(planet.addMultiple(newPlanets));
        }

        // TODO: Choose a starting body

        // TODO: Choose an ending body

        // TODO: Set the initial ship position and velocity
        dispatch(ship.update({
            initialPosition: {x: 0, y:100},
            initialVelocity: {x: 1, y:0},
            position: {x: 0, y: 100},
            velocity: {x: 1, y: 0},
        }));

        // TODO: clear the deltaV's
    }, {})(),
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