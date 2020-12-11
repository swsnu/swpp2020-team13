import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { mount } from 'enzyme'
import { getMockStore } from '../../test-utils/mocks'
// import { getMockStore } from '../../test-utils/mock'
import DashBoardComponent from './DashBoardComponent'
import history from '../../history'
import { actionTypes } from '../../store/actions/types'
import * as goalActionCreators from '../../store/actions/goal'

const stubInitialState = {
    auth: null,
}

const mockStore = getMockStore(stubInitialState)

describe('<DashboardComponent />', ()=> {
    let WrappedDashBoard

    beforeEach(() => {
        WrappedDashBoard = (
            <Provider store={mockStore}>
                <Router history={history}>
                    <Route path="/" component={DashBoardComponent} />
                </Router>
            </Provider>
        )
        goalActionCreators.getAllGoal = jest.fn(() => dispatch => {
            const goals = [
                {
                    'id': 1,
                    'user': 1,
                    'title': 'TITLE',
                    'tags': ['tag1', 'tag2']
                }
            ]
            dispatch({ type: actionTypes.GET_ALL_GOAL, payload: goals })
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
      })

    it("should render without errors", ()=> {
        const component = mount(WrappedDashBoard)
        const wrapper = component.find('.dashboard')
        expect(wrapper.length).toBe(1)
    })
})