import React from 'react';
import './App.css';
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
