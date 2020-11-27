import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { getMockStore } from '../../test-utils/mocks'
import GoalListComponent from './GoalListComponent'

const stubInitialState = {
    auth: null,
    modal: {
        authModal: true
    }
}
const mockStore = getMockStore(stubInitialState);

const mockDate = new Date();

describe('GoalList', () => {
    let WrappedGoalList;
    beforeEach(() => {
        WrappedGoalList = (
            <Provider store={mockStore}>
                <GoalListComponent />
            </Provider>
        )
    })

    it('should render without errors', () => {
        const component = mount(WrappedGoalList)
        const wrapper = component.find('.calendarpanel .goallist')
        expect(wrapper.length).toBe(1)
    })

    it('should get all goals', () => {

    })
})