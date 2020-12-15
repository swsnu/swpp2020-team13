import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios'
import './App.css'
import history from './history'
import HomePage from './pages/login/index'
import GoalList from './pages/main/GoalListComponent'
import CreatePage from './pages/main/CreateGoalComponent/CreateGoalComponent'
import EditPage from './pages/edit/EditPageComponent'
import DashBoard from './pages/dashboard/DashBoardComponent'
import GoalDetailPage from './pages/GoalDetail/GoalDetailPage'
import ExplorePage from './pages/explore/ExplorePageComponent'
import ExploreGoalDetailPage from './pages/ExploreGoalDetail/ExploreGoalDetailPage'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function App(props) {
    return (
    <Router history={history}>
        <div className="App" id="fill-window">
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/create" exact component={CreatePage}/>
                <Route path="/edit" exact component={EditPage}/>
                <Route path="/main" exact component={GoalList} />
                <Route path="/dashboard" exact component={DashBoard} />
                <Route path="/explore" exact component={ExplorePage} />
                <Route path="/explore/goalhistory/:id" exact component={ExploreGoalDetailPage} />
                <Route path="/goalhistory/:id" exact component={GoalDetailPage}/>
                {/* <Route path="/profile" exact component={Profile} /> */}
            </Switch>
        </div>
    </Router>
    )
}

export default App