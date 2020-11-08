import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css'
import history from './history'
import HomePage from './pages/login/index'
import GoalList from './pages/main/GoalListComponent'
import CreatePage from './pages/main/CreateGoalComponent/CreateGoalComponent'

const App = () => (
    <Router history={history}>
        <div className="App" id="fill-window">
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/create" exact component={CreatePage}/>
                <Route path="/main" exact component={GoalList} />
            </Switch>
        </div>
    </Router>
)

export default App