// What gets passed into the component from the parent as attributes
export declare interface IGameProps {

}

// What gets returned from the first connect function (mapStateToProps)
export declare interface IGameStateProps {

}

// What gets returned from the second connect function (mapDispatchToProps)
export declare interface IGameDispatchProps {

}

// What gets added in the third connect function (mergeProps)
export declare interface IGameMergeProps {

}

// The props that finally get passed to the component
export declare type GameProps = IGameStateProps & IGameDispatchProps & IGameMergeProps & IGameProps;
