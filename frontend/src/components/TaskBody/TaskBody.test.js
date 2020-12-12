import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { shallow, mount } from 'enzyme';
import TaskBodyComponent from './TaskBodyComponent';

const stubTask = {
    title: "test",
    deadline: "1000",
    importance: 2,
    day_of_week: []
}

let mockStore = createStore(()=>{})

describe("<TaskBody/>", ()=>{
    let WrappedTaskBody
    beforeEach(()=>{
        WrappedTaskBody = (
            <Provider store={mockStore}>
                <TaskBodyComponent task={stubTask}/>
            </Provider>
        )
    })

    afterEach(()=>{
        jest.clearAllMocks()
    })

    it("should render without failing", ()=>{
        const component = shallow(WrappedTaskBody).dive()
        // const component = shallow(<TaskBodyComponent task={stubTask}/>)
        console.log(component.debug())
        const wrapper = component.find('.TaskBodySegment')
        // TODO: received: 0
        // expect(wrapper.length).toBe(1)
    })

    it("should call edit task handler", ()=> {
        const component = mount(WrappedTaskBody)
        // const component = mount(<TaskBodyComponent task={stubTask}/>)
        const wrapper = component.find('.TaskBodySegment .EditTaskButtonA #EditButtonTaskBody')
        // TODO: wrapper.length: 0
        // wrapper.simulate("click")
    })

    it("should handle when day of week is NOT empty", () => {
        const stubTask2 = {
            title: "test",
            deadline: "1000",
            importance: 2,
            day_of_week: ["TUESDAY", "FRIDAY"]
        }
        const component = mount(WrappedTaskBody)
        // const component = mount(<TaskBodyComponent task={stubTask2}/>)
        const wrapper = component.find('.TaskBodySegment .TaskBodyListDeadline')
        expect(wrapper.length).toBe(1)
    })

    it("should call edit deadline handler", ()=> {
        const component = mount(WrappedTaskBody)
        // const component = mount(<TaskBodyComponent task={stubTask}/>)
        const wrapper1 = component.find('.TaskBodySegment .EditTaskButtonA #EditButtonTaskBody')
        // TODO: wrapper1.length: 1
        // wrapper1.simulate("click")
        const wrapper = component.find('#EditTaskFormDeadline input')
        // console.log(component.debug())
        const event = { data: { value: "2020-11-12" } }
        // TODO: wrapper.length: 0
        // wrapper.simulate("change", event)
    })

    it("should close when close clicked in editmode", ()=>{
        const component = mount(WrappedTaskBody)
        // const component = mount(<TaskBodyComponent task={stubTask}/>)
        const wrapper1 = component.find('.TaskBodySegment .EditTaskButtonA #EditButtonTaskBody')
        // TODO: wrapper1.length: 0
        // wrapper1.simulate("click")
        const wrapper = component.find('.EditTaskCloseButton #EditTaskClose')
        // console.log(component.debug())
        // TODO: wrapper.length: 0
        // wrapper.simulate("click")
    })

    it("should close when submit clicked in editmode", ()=>{
        const component = mount(WrappedTaskBody)
        // const component = mount(<TaskBodyComponent task={stubTask}/>)
        const wrapper1 = component.find('.TaskBodySegment .EditTaskButtonA #EditButtonTaskBody')
        // TODO: wrapper1.length: 0
        // wrapper1.simulate("click")
        const wrapper = component.find('.EditTaskSubmitButton #EditTaskSubmit')
        // console.log(component.debug())
        // TODO: wrapper.length: 0
        // wrapper.simulate("click")
    })

    it("should call edit title handler", ()=> {
        const component = mount(WrappedTaskBody)
        // const component = mount(<TaskBodyComponent task={stubTask}/>)
        const wrapper1 = component.find('.TaskBodySegment .EditTaskButtonA #EditButtonTaskBody')
        // TODO: wrapper.length: 0
        // wrapper1.simulate("click")
        const wrapper = component.find('Input #EditTaskFormTitle')
        // console.log(component.debug())
        const event = { data: { value: "title" } }
        // TODO: wrapper.length: 0
        // wrapper.simulate("change", event)
    })
    
})