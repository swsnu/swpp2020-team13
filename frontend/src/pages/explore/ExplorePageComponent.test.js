import React from 'react'
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

import ExplorePage from './ExplorePageComponent' 

const stubState = {
    explore: {
        goals: []
    }
}

let mockStore = createStore(() => stubState, null, applyMiddleware(thunk))

describe('ExplorePage ', () => {
    let WrappedExplorePage
    beforeEach(() => {
        WrappedExplorePage = (
            <Provider store={mockStore} >
                <ExplorePage />
            </Provider>
        )
        axios.get = jest.fn(url => Promise.resolve({ status: 200, data: {} }))
    })

    afterEach(() => { jest.clearAllMocks() });

    it('should render without errors', () => {
        const component  = mount(WrappedExplorePage)
        // const wrapper = component.find(".AccContainer")
        // expect(wrapper.length).toBe(1)
    })
})