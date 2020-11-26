
export declare interface IVector {
    x:number;
    y:number;
}

export declare interface ITimer {
    time: number;
    steps: number;
    dT: number;
}

export declare interface IShip {
    position: IVector;
    velocity: IVector;
    initialPosition: IVector;
    initialVelocity: IVector;
}

export declare type Status = "playing" | "dead" | "won";

export declare interface IGame {
    startId:string;
    targetId:string;
    status: Status;
}

export declare interface IDeltaV {
    id: string;
    deltaV: number;
    time: number;
    angle: number;
}

export declare interface IBody {
    name: string;
    mass: number;
    radius: number;
}

export declare interface IPlanetDisplayAttributes {
    minViewSize: number;
    borderColor: string;
    color: string;
}

export declare interface IOrbit {
    parent: CelestialBody;
    e: number;
    a: number;
    w: number;
    v0: number;
    period?: number;
    n?:number;
}

export declare interface ICelestialBody {
    id: string;
    attributes: IBody;
    orbit?: IOrbit;
}

export declare interface ISatellite extends ICelestialBody {
    orbit: IOrbit;
}

export declare interface IViewable {
    view: IPlanetDisplayAttributes;
}

export declare interface IZoomable {
    zoom: number;
}

export declare interface ITimeable {
    time: number;
}

export declare interface IOffsetable {
    offset:IVector;
}

export declare type ViewableCelestialObject = ICelestialBody & IViewable;

// -----
export declare interface ISolverOptions {
    maxSteps?: number;
    maxDelta?: number;
    min?: number;
    max?: number;
    initialValue?: number;
}