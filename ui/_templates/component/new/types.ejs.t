---
to: src/components/<%= componentName %>/<%= componentName %>.d.ts
---
// What gets passed into the component from the parent as attributes
export declare interface I<%= componentName %>Props {

}

// What gets returned from the first connect function (mapStateToProps)
export declare interface I<%= componentName %>StateProps {

}

// What gets returned from the second connect function (mapDispatchToProps)
export declare interface I<%= componentName %>DispatchProps {

}

// What gets added in the third connect function (mergeProps)
export declare interface I<%= componentName %>MergeProps {

}

// The props that finally get passed to the component
export declare type <%= componentName %>Props = I<%= componentName %>StateProps & I<%= componentName %>DispatchProps & I<%= componentName %>MergeProps & I<%= componentName %>Props;
