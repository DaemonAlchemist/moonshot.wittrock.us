// What gets passed into the component from the parent as attributes
export declare interface IViewportProps {

}

// What gets returned from the first connect function (mapStateToProps)
export declare interface IViewportStateProps {

}

// What gets returned from the second connect function (mapDispatchToProps)
export declare interface IViewportDispatchProps {

}

// What gets added in the third connect function (mergeProps)
export declare interface IViewportMergeProps {

}

// The props that finally get passed to the component
export declare type ViewportProps = IViewportStateProps & IViewportDispatchProps & IViewportMergeProps & IViewportProps;