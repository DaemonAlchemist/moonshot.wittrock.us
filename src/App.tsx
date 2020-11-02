import React from 'react';
import './App.less';
import { Viewport } from './components/Viewport';
import {ReduxContainer} from 'simple-redux-container';

export const App = () => 
  <ReduxContainer
    reducers={{}}
    useLogger={true}
    middleware={[]}
    initialState={{}}
  >
    <div className="App">
      <Viewport />
    </div>
  </ReduxContainer>;
