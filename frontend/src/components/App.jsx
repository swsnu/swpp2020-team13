import React from 'react';
import './App.css';

import {ConnectedRouter } from 'connected-react-router'

import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import GoalList from '../pages/main/GoalListComponent'
import CurrentGoals from '../pages/dashboard/CurrentGoalsComponent';
import SearchBar from '../pages/explore/SearchBarComponent';

function App(props) {
  return (
    <BrowserRouter history={props.history}>
    <div className="App">
      <Switch>
        {/* <Route path='/' exact render={()=><Login/>}/> */}
        <Route path='/main' exact render={()=><GoalList/>}/>
        <Route path='/dashboard' exact render={()=><CurrentGoals/>}/>
        <Route path='/explore' exact render={()=><SearchBar/>}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
