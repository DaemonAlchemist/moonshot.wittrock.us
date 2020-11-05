
export declare interface IPosition {
    x:number;
    y:number;
}

export declare interface ITimer {
    time: number;
}

export declare interface IShip {
    position: IPosition;
    velocity: IPosition;
    initialPosition: IPosition;
    initialVelocity: IPosition;
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
}

export declare interface ICelestialBody {
    id: string;
    attributes: IBody;
    position: IPosition;
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
    offset:IPosition;
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