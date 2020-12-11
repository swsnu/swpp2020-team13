import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { getMockStore } from '../../test-utils/mocks'
// import { getMockStore } from '../../test-utils/mock'
import DashBoardComponent from './DashBoardComponent'
import history from '../../history'
import { actionTypes } from '../../store/actions/types'
import * as goalActionCreators from '../../store/actions/goal'

const stubInitialState = {
    auth: null,
    goal: [
        {
            'id': 1,
            'user': 1,
            'title': 'TITLE',
            'tags': ['tag1', 'tag2']
        }
    ]
}

const mockStore = getMockStore(stubInitialState)

describe('<DashboardComponent />', ()=> {
    // let WrappedDashBoard

    // beforeEach(() => {
    //     WrappedDashBoard = (
    //         <Provider store={mockStore}>
    //             <Router history={history}>
    //                 <Route path="/" component={() => <DashBoardComponent goals={stubInitialState.goal}/>} />
    //             </Router>
    //         </Provider>
    //     )
    //     goalActionCreators.getAllGoal = jest.fn(() => dispatch => {
    //         const goals = mockStore.getState().goal
    //         dispatch({ type: actionTypes.GET_ALL_GOAL, payload: goals })
    //     })
    // })

    // afterEach(() => {
    //     jest.clearAllMocks()
    //   })

    it("should render without errors", ()=> {
        // const component = mount(WrappedDashBoard)
        // console.log("mount: ", component.debug())
        const component = shallow(<DashBoardComponent store={mockStore}/>).dive()
        expect(component.length).toBe(1)
        // const wrapper = component.find('.dashboard')
        // expect(wrapper.length).toBe(1)
    })
})