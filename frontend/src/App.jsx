import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css'
import history from './history'
import HomePage from './pages/login/index'
import GoalList from './pages/main/GoalListComponent'
import CreatePage from './pages/main/CreateGoalComponent/CreateGoalComponent'
import Profile from './pages/profile/index'
import CurrentGoals from './pages/dashboard/CurrentGoalsComponent';
import SearchBar from './pages/explore/SearchBarComponent';

const App = () => (
    <Router history={history}>
        <div className="App" id="fill-window">
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/create" exact component={CreatePage}/>
                <Route path="/main" exact component={GoalList} />
                <Route path="/dashboard" exact component={CurrentGoals} />
                <Route path="/explore" exact component={SearchBar} />
                <Route path="/profile" exact component={Profile} />
            </Switch>
        </div>
    </Router>
)

export default App