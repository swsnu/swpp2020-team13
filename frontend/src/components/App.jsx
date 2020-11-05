import React from 'react';
import './App.css';

import {ConnectedRouter } from 'connected-react-router'

import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import GoalList from '../pages/main/GoalListComponent'
import CreateGoal from '../pages/main/CreateGoalComponent'

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
    <div className="App">
      <Switch>
        {/* <Route path='/' exact render={()=><Login/>}/> */}
        <Route path='/main' exact render={()=><GoalList/>}/>
        <Route path='/create' exact render={()=><CreateGoal/>}/>
      </Switch>
    </div>
    </ConnectedRouter>
  );
}

export default App;
