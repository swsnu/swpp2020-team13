import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { getMockStore } from '../../test-utils/mocks'
import { Router } from 'react-router'
import history from '../../history'
import EditPage from './EditPageComponent';

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
        authModal: true
    },
    goal: {
        goals: [mockGoal],
        selectedGoal: mockGoal
    }
}
const mockStore = getMockStore(stubInitialState);

describe('GoalList', () => {
    let WrappedEditPage;
    beforeEach(() => {
        WrappedEditPage = (
            <Provider store={mockStore}>
                <Router history={history}> 
                <EditPage tasks={[]} />
                </Router>
            </Provider>
        )
    })

    afterEach(()=>{
        jest.clearAllMocks();
    })

    it('should render without errors', () => {
        const component = mount(WrappedEditPage)
        const wrapper = component.find('.EditPage')
        expect(wrapper.length).toBe(1)
    })

    it('should accept click in edit task tab', () => {
        const component = mount(WrappedEditPage)
        const wrapper = component.find('.EditPage .EditTaskTabButton button')
        wrapper.simulate("click")
    })

    it('should accept click in edit goal tab', () => {
        const component = mount(WrappedEditPage)
        const wrapper = component.find('.EditPage .EditGoalTabButton button')
        wrapper.simulate("click")
    })

})