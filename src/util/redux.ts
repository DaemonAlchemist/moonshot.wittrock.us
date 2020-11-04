import { Entity, entity, IEntityDefinition, ISingletonDefinition, Singleton, singleton, theReducer } from 'the-reducer';
import { IDeltaV, ITimer, ViewableCelestialObject } from './sim';

// --------------------------- //

const planetDef:IEntityDefinition<ViewableCelestialObject, {}> = {
    module: "moonshot",
    entity: "planet",
    default: {
        id: "",
        attributes: {mass: 0, name: "", radius: 0},
        position: {x: 0, y: 0},
        view: {minViewSize: 0, borderColor: "000000", color: "666666"}
    }
}
export const planet:Entity<ViewableCelestialObject> = entity<ViewableCelestialObject>(planetDef);

// --------------------------- //

const deltaVDef:IEntityDefinition<IDeltaV, {}> = {
    module: "moonshot",
    entity: "deltaV",
    default: {id: "", deltaV: 0, time: 0, angle: 0}
}
export const deltaV:Entity<IDeltaV> = entity<IDeltaV>(deltaVDef);

// --------------------------- //

const timerDef:ISingletonDefinition<ITimer, {}> = {
    module: "moonshot",
    entity: "timer",
    default: {time: 0, isRunning: false},
}
export const timer:Singleton<ITimer, {}> = singleton<ITimer>(timerDef);

// --------------------------- //

export const moonshotReducer = {
    theReducerEntities: theReducer.entity(planet, deltaV),
    theReducerSingletons: theReducer.singleton(timer),
}