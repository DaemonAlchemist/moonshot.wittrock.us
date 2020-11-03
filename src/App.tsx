import React from 'react';
import { ReduxContainer } from 'simple-redux-container';
import './App.less';
import { Game } from './components/Game';
import { moonshotReducer } from './util/redux';

export const App = () => 
  <ReduxContainer
    reducers={moonshotReducer}
    useLogger={false}
    middleware={[]}
    initialState={{}}
  >
    <Game />
  </ReduxContainer>;
