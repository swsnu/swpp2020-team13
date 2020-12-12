import React from 'react'
import { Provider } from 'react-redux'
// import { Router, Route } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { getMockStore } from '../../test-utils/mocks'
import DashBoardComponent from './DashBoardComponent'
// import history from '../../history'
import axios from 'axios'

const stubInitialState = {
    auth: null,
    goal: {
        goals: [
            {
                'id': 1,
                'user': 1,
                'title': 'TITLE',
                'tags': ['tag1', 'tag2']
            }
        ]
    }
}

const mockStore = getMockStore(stubInitialState)

describe('<DashboardComponent />', ()=> {
    let WrappedDashBoard

    beforeEach(() => {
        WrappedDashBoard = (
            <Provider store={mockStore}>
                <DashBoardComponent />
            </Provider>
        )
        axios.get = jest.fn(url => Promise.resolve({ status: 200, data: {} }))
    })

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