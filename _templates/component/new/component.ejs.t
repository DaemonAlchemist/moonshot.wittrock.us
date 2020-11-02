---
to: src/components/<%= componentName %>/<%= componentName %>.component.tsx
---
import * as React from 'react';
import {<%= componentName %>Props} from "./<%= componentName %>.d";
import './<%= componentName %>.less';

export const <%= componentName %>Component = (props:<%= componentName %>Props) =>
    <div><%= componentName %> component goes here.</div>;
