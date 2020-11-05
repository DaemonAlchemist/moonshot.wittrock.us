import { IOffsetable, ViewableCelestialObject } from "../../util/sim";

// What gets passed into the component from the parent as attributes
export declare type IPlanetProps = ViewableCelestialObject & IZoomable & IOffsetable;

// What gets returned from the first connect function (mapStateToProps)
export declare interface IPlanetStateProps {
    time: number;
}

// What gets returned from the second connect function (mapDispatchToProps)
export declare interface IPlanetDispatchProps {
    updatePosition: (time:number) => void;
    onClick?:(planetId:string) => void;
}

// What gets added in the third connect function (mergeProps)
export declare interface IPlanetMergeProps {

}

// The props that finally get passed to the component
export declare type PlanetProps = IPlanetStateProps & IPlanetDispatchProps & IPlanetMergeProps & IPlanetProps;
