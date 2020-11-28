import React from 'react'
import { shallow, mount } from 'enzyme'
import AddTaskForm from './AddTaskForm'
import {getMockStore} from '../../../test-utils/mocks'
import { Provider } from 'react-redux'
import chai, { expect } from 'chai'
import history from '../../../history'
import { Router} from 'react-router-dom';

const stubInitialState = {
    auth: null,
    modal: {
        auth: true
    }
}
const mockStore = getMockStore(stubInitialState);

describe('<AddTaskForm />', ()=> {
    let WrappedAddTaskForm
    beforeEach(() => {
    WrappedAddTaskForm = (
      <Provider store={mockStore}>
        <Router history={history}>
        <AddTaskForm />
        </Router>
      </Provider>
    )}
    )

    it("should render without errors", ()=> {
        const component = mount(WrappedAddTaskForm)
        const wrapper = component.find('.AddTaskForm #AddTaskFormSegment')
        expect(wrapper.length).eql(1)
    })


    it("should accept title input", ()=> {
        const component = mount(WrappedAddTaskForm)
        console.log(component.debug())
        const wrapper = component.find('#AddTaskFormTitle .ui input')
        wrapper.simulate('change', {data:{value: "TEST_TITLE"}})
    })

    it("should accept deadline input", ()=> {
        const component = mount(WrappedAddTaskForm)
        // console.log(component.debug())
        const wrapper = component.find('#AddTaskFormDeadline input')
        wrapper.simulate('change', {data:{value: "2020-11-23"}})
    })

    it("should accept importance selection", ()=> {
        const component = mount(WrappedAddTaskForm)
        const wrapper = component.find('#AddTaskFormImportance #simple-controlled-3')
        wrapper.simulate('click')
        wrapper.simulate('change', {newValue: 3})
    })

})