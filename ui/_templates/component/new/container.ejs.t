---
to: src/components/<%= componentName %>/<%= componentName %>.container.ts
---
import { connect } from 'react-redux';
import { <%= componentName %>Component } from './<%= componentName %>.component';
import {I<%= componentName %>StateProps, I<%= componentName %>Props, I<%= componentName %>DispatchProps, <%= componentName %>Props} from "./<%= componentName %>.d";

// The mapStateToProps function:  Use this to fetch data from the Redux store via selectors
export const mapStateToProps = (state:any, props:I<%= componentName %>Props):I<%= componentName %>StateProps => ({

});

// The mapDispatchToProps function:  Use this to define handlers and dispatch basic actions
export const mapDispatchToProps = (dispatch:any, props:I<%= componentName %>Props):I<%= componentName %>DispatchProps => ({

});

// The mergeProps function:  Use this to define handlers and dispatchers that require access to state props
export const mergeProps = (state:I<%= componentName %>StateProps, dispatch:I<%= componentName %>DispatchProps, props:I<%= componentName %>Props):<%= componentName %>Props => ({
    ...state,
    ...dispatch,
    ...props,
});

export const <%= componentName %> = connect<I<%= componentName %>StateProps, I<%= componentName %>DispatchProps, I<%= componentName %>Props, <%= componentName %>Props, any>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(<%= componentName %>Component);