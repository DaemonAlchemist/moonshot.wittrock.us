import { ITimer, IDeltaV, IShip, IGame } from "../../util/sim";

// What gets passed into the component from the parent as attributes
export declare interface IGameProps {
    
}

// What gets returned from the first connect function (mapStateToProps)
export declare interface IGameStateProps {
    timer: ITimer;
    deltaVs: IDeltaV[];
    ship:IShip;
    planets:ViewableCelestialObject[];
    game: IGame;
}

// What gets returned from the second connect function (mapDispatchToProps)
export declare interface IGameDispatchProps {
    resetLevel: (level:number) => void;
    updateShip: (s:Partial<IShip>) => void;
    updateTime: (t:number) => void;
    addDeltaV: (time:number) => () => void;
    onChangeDeltaV: (id:string, field:string) => (value?:string | number) => void;
    onDeleteDeltaV: (id:string) => () => void;
    updateSpeed: (speed:number) => () => void;
}

// What gets added in the third connect function (mergeProps)
export declare interface IGameMergeProps {
    tick: () => void;
}

// The props that finally get passed to the component
export declare type GameProps = IGameStateProps & IGameDispatchProps & IGameMergeProps & IGameProps;
