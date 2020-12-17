import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { getMockStore } from '../../test-utils/mocks'
import GoalListComponent from './GoalListComponent'
import { Router } from 'react-router'
import history from '../../history'

const mockGoal = {
    id: 1,
    title: "title",
    deadline: 1000,
    tags: [],
    tasks: [],
}
const stubInitialState = {
    auth: "login",
    modal: {
        authModal: true,
    },
    goal: {
        goals: [mockGoal],
    }
}
const mockStore = getMockStore(stubInitialState);

describe('GoalList', () => {
    let WrappedGoalList;
    beforeEach(() => {
        WrappedGoalList = (
            <Provider store={mockStore}>
                <Router history={history}> 
                <GoalListComponent />
                </Router>
            </Provider>
        )
    })

    it('should render without errors', () => {
        const component = mount(WrappedGoalList)
        const wrapper = component.find('.goallist')
        expect(wrapper.length).toBe(1)
    })

    it('calendarpanel should accept deadlinde changes', ()=> {
        const component = mount(WrappedGoalList)
        const wrapper = component.find('.calendarpanel Calendar')
        const date = new Date
        wrapper.simulate("change", date)
        // console.log(component.debug())
    })
})