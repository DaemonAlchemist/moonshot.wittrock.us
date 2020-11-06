import { IShip, IPosition, ViewableCelestialObject } from "../../util/sim";

// What gets passed into the component from the parent as attributes
export declare interface IShipProps {
    zoom: number;
    offset: IPosition;
}

// What gets returned from the first connect function (mapStateToProps)
export declare interface IShipStateProps {
    ship:IShip;
    time:number;
    planets:ViewableCelestialObject[];
    deltaVs:IDeltaV[];
}

// What gets returned from the second connect function (mapDispatchToProps)
export declare interface IShipDispatchProps {
    update: (newShip:Partial<IShip>) => void;
}

// What gets added in the third connect function (mergeProps)
export declare interface IShipMergeProps {
    tick: () => void;
}

// The props that finally get passed to the component
export declare type ShipProps = IShipStateProps & IShipDispatchProps & IShipMergeProps & IShipProps;
