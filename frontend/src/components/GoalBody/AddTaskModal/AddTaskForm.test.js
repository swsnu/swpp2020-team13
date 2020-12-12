import React from 'react'
import { shallow, mount } from 'enzyme'
import AddTaskForm from './AddTaskForm'
import {getMockStore} from '../../../test-utils/mocks'
import { Provider } from 'react-redux'
import chai, { expect } from 'chai'
import history from '../../../history'
import { Router} from 'react-router-dom';
import moment from 'moment'
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
        <AddTaskForm goal_deadline={moment(new Date).unix()+10000} goal_start_at={moment(new Date).unix()+10000}/>
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

    it("should accept deadline input: deadline < goal_deadline", ()=> {
        const component = mount(WrappedAddTaskForm)
        // console.log(component.debug())
        const wrapper = component.find('#AddTaskFormDeadline input')
        wrapper.simulate('change', {data:{value: moment(new Date).format("YYYY-MM-DD")}})
    })

    it("should accept deadline input: deadline > goal_deadline", ()=> {
        const component = mount(WrappedAddTaskForm)
        // console.log(component.debug())
        const wrapper = component.find('#AddTaskFormDeadline input')
        wrapper.simulate('change', {data:{value: moment(new Date).add(15,'days'). format('YYYY-MM-DD')}})
    })

    it("should accept deadline input: start_At < goal_start_at", ()=> {
        const component = mount(WrappedAddTaskForm)
        // console.log(component.debug())
        const wrapper = component.find('#AddTaskFormStartAt input')
        wrapper.simulate('change', {data:{value: moment(new Date).format("YYYY-MM-DD")}})
    })

    it("should accept deadline input: start_at > goal_start_at", ()=> {
        const component = mount(WrappedAddTaskForm)
        // console.log(component.debug())
        const wrapper = component.find('#AddTaskFormStartAt input')
        wrapper.simulate('change', {data:{value: moment(new Date).add(15,'days'). format('YYYY-MM-DD')}})
    })

    it("should accept importance selection", ()=> {
        const component = mount(WrappedAddTaskForm)
        const wrapper = component.find('#AddTaskFormImportance #simple-controlled-3')
        wrapper.simulate('click')
        wrapper.simulate('change', {newValue: 3})
    })

})