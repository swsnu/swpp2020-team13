import React from 'react'
import { shallow, mount } from 'enzyme'
import AddTaskModal from './AddTaskModal'
import {getMockStore} from '../../../test-utils/mocks'
import { Provider } from 'react-redux'

const stubInitialState = {
    auth: null,
    modal: {
        auth: true
    }
}
const mockStore = getMockStore(stubInitialState);

describe('<AddTaskModal />', ()=> {
    let WrappedAddTaskModal
    beforeEach(() => {
    WrappedAddTaskModal = (
      <Provider store={mockStore}>
        <AddTaskModal />
      </Provider>
    )}
    )

    it("should render without errors", ()=> {
        const component = mount(WrappedAddTaskModal)
        const wrapper = component.find('.SegmentAddTask #SegmentAddTaskModal')
        expect(wrapper.length).toBe(1)
    })

})