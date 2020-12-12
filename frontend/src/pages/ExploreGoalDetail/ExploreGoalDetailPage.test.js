import React from 'react'
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

import ExploreGoalDetailPage from './ExploreGoalDetailPage' 

const stubState = {
    explore: {
        selectedGoal: {
            tasks: [],
            tags: []
        },
        achievements: []
    }
}

let mockStore = createStore(() => stubState, null, applyMiddleware(thunk))

describe('ExploreGoalDetailPage ', () => {
    let WrappedExploreGoalDetailPage
    beforeEach(() => {
        WrappedExploreGoalDetailPage = (
            <Provider store={mockStore} >
                <ExploreGoalDetailPage match={{params: {id: '1'}}}/>
            </Provider>
        )
        axios.get = jest.fn(url => Promise.resolve({ status: 200, data: {} }))
    })

    afterEach(() => { jest.clearAllMocks() });

    it('should render without errors', () => {
        const component  = mount(WrappedExploreGoalDetailPage)
        // const wrapper = component.find(".AccContainer")
        // expect(wrapper.length).toBe(1)
    })
})