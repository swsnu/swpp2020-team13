import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css'
import history from './history'
import HomePage from './pages/login/index'
import MainPage from './pages/main'
import CreatePage from './pages/main/CreateGoalComponent/CreateGoalComponent'

const App = () => (
    <Router history={history}>
        <div className="App" id="fill-window">
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/create" exact component={CreatePage}/>
                <Route path="/main" exact component={MainPage} />
            </Switch>
        </div>
    </Router>
)

export default App