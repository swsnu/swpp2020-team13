import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';

import history from './history'
import HomePage from './pages/index'
import MainPage from './pages/main'

const App = () => (
    <Router history={history}>
        <div className="App">
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/main" exact component={MainPage} />
            </Switch>
        </div>
    </Router>
)

export default App