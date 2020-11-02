// What gets passed into the component from the parent as attributes
export declare interface IPlanetProps {

}

// What gets returned from the first connect function (mapStateToProps)
export declare interface IPlanetStateProps {

}

// What gets returned from the second connect function (mapDispatchToProps)
export declare interface IPlanetDispatchProps {

}

// What gets added in the third connect function (mergeProps)
export declare interface IPlanetMergeProps {

}

// The props that finally get passed to the component
export declare type PlanetProps = IPlanetStateProps & IPlanetDispatchProps & IPlanetMergeProps & IPlanetProps;