import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { getMockStore } from '../../test-utils/mocks'
import history from '../../history'
import axios from 'axios'
// import { DashBoardPanel } from './DashBoardPanel/DashBoardPanelComponent';
import GoalDetailPage from './GoalDetailPage';


const stubInitialState = {
    auth: null,
        goal: {
            selectedGoal: 
            {
                'id': 1,
                'user': 1,
                'title': 'TITLE',
                'tags': ['tag1', 'tag2'],
                'tasks': []
            }
        
    }
}

const MockGoal = {
    'id': 1,
    'user': 1,
    'title': 'TITLE',
    'tags': ['tag1', 'tag2'],
    'tasks': []
}

const mockStore = getMockStore(stubInitialState)

describe('<GoalDetailPage />', ()=> {
    let WrappedGoalDetail

    beforeEach(() => {
        let match_test = {params: {id: '1'}}
        history.location.pathname='/goalhistory/1'
        WrappedGoalDetail = (
            <Provider store={mockStore}>
                <Router history={history}>
                    <Switch>
                <Route path='/goalhistory/:id' exact render={()=><GoalDetailPage history={history} match={match_test} selectedGoal={MockGoal}/>}/>
                    </Switch>
                </Router>
            </Provider>
        )
        axios.get = jest.fn(url => Promise.resolve({ status: 200, data: {} }))
    })

    afterEach(() => {
        jest.clearAllMocks()
      })

    it("should render without errors", ()=> {
        // const component = mount(WrappedDashBoard)
        const component = mount(WrappedGoalDetail)
        console.log("mount: ", component.debug())
        expect(component.length).toBe(1)
        // const wrapper = component.find('.dashboard')
        // expect(wrapper.length).toBe(1)
    })

})