
export declare interface IPosition {
    x:number;
    y:number;
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
    attributes: IBody;
}

export declare interface ICentralBody {
    position: IPosition;
}

export declare interface ISatellite {
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

export declare type CentralBody = ICentralBody & ICelestialBody;
export declare type Satellite = ISatellite & ICelestialBody;
export declare type CelestialBody = CentralBody | Satellite;

export declare type ViewableCelestialObject = CelestialBody & IViewable;

// -----
export declare interface ISolverOptions {
    maxSteps?: number;
    maxDelta?: number;
    dX?: number;
    initialValue?: number;
}