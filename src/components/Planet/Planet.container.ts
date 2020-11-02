import { connect } from 'react-redux';
import { PlanetComponent } from './Planet.component';
import {IPlanetStateProps, IPlanetProps, IPlanetDispatchProps, PlanetProps} from "./Planet.d";

// The mapStateToProps function:  Use this to fetch data from the Redux store via selectors
export const mapStateToProps = (state:any, props:IPlanetProps):IPlanetStateProps => ({

});

// The mapDispatchToProps function:  Use this to define handlers and dispatch basic actions
export const mapDispatchToProps = (dispatch:any, props:IPlanetProps):IPlanetDispatchProps => ({

});

// The mergeProps function:  Use this to define handlers and dispatchers that require access to state props
export const mergeProps = (state:IPlanetStateProps, dispatch:IPlanetDispatchProps, props:IPlanetProps):PlanetProps => ({
    ...state,
    ...dispatch,
    ...props,
});

export const Planet = connect<IPlanetStateProps, IPlanetDispatchProps, IPlanetProps, PlanetProps, any>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(PlanetComponent);