import { connect } from 'react-redux';
import { GameComponent } from './Game.component';
import {IGameStateProps, IGameProps, IGameDispatchProps, GameProps} from "./Game.d";

// The mapStateToProps function:  Use this to fetch data from the Redux store via selectors
export const mapStateToProps = (state:any, props:IGameProps):IGameStateProps => ({

});

// The mapDispatchToProps function:  Use this to define handlers and dispatch basic actions
export const mapDispatchToProps = (dispatch:any, props:IGameProps):IGameDispatchProps => ({

});

// The mergeProps function:  Use this to define handlers and dispatchers that require access to state props
export const mergeProps = (state:IGameStateProps, dispatch:IGameDispatchProps, props:IGameProps):GameProps => ({
    ...state,
    ...dispatch,
    ...props,
});

export const Game = connect<IGameStateProps, IGameDispatchProps, IGameProps, GameProps, any>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(GameComponent);