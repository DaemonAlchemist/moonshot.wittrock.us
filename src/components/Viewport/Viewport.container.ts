import { connect } from 'react-redux';
import { planet, timer } from '../../util/redux';
import { ViewportComponent } from './Viewport.component';
import { IViewportDispatchProps, IViewportProps, IViewportStateProps, ViewportProps } from "./Viewport.d";

// The mapStateToProps function:  Use this to fetch data from the Redux store via selectors
export const mapStateToProps = (state:any, props:IViewportProps):IViewportStateProps => ({
    planets: planet.getMultiple(state, () => true),
    time: timer.get(state).time,
});

// The mapDispatchToProps function:  Use this to define handlers and dispatch basic actions
export const mapDispatchToProps = (dispatch:any, props:IViewportProps):IViewportDispatchProps => ({

});

// The mergeProps function:  Use this to define handlers and dispatchers that require access to state props
export const mergeProps = (state:IViewportStateProps, dispatch:IViewportDispatchProps, props:IViewportProps):ViewportProps => ({
    ...state,
    ...dispatch,
    ...props,
});

export const Viewport = connect<IViewportStateProps, IViewportDispatchProps, IViewportProps, ViewportProps, any>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(ViewportComponent);