import React from 'react';
import './App.css';

import {ConnectedRouter } from 'connected-react-router'

import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import GoalList from '../pages/main/GoalListComponent'

function App(props) {
  return (
    <BrowserRouter history={props.history}>
    <div className="App">
      <Switch>
        {/* <Route path='/' exact render={()=><Login/>}/> */}
        <Route path='/main' exact render={()=><GoalList/>}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
