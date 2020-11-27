import React from 'react'
import { shallow, mount } from 'enzyme';
import TaskBodyComponent from './TaskBodyComponent';

const stubTask = {
    title: "test",
    deadline: "1000",
    importance: 2,
    day_of_week: []
}
describe("<TaskBody/>", ()=>{
    afterEach(()=>{
        jest.clearAllMocks()
    })

    it("should render without failing", ()=>{
        const component = shallow(<TaskBodyComponent task={stubTask}/>)
        const wrapper = component.find('.TaskBodySegment')
        expect(wrapper.length).toBe(1)
    })

    it("should call edit task handler", ()=> {
        const component = mount(<TaskBodyComponent task={stubTask}/>)
        const wrapper = component.find('.TaskBodySegment .EditTaskButtonA #EditButtonTaskBody')
        wrapper.simulate("click")
    })

    it("should handle when day of week is NOT empty", () => {
        const stubTask2 = {
            title: "test",
            deadline: "1000",
            importance: 2,
            day_of_week: ["TUESDAY", "FRIDAY"]
        }
        const component = mount(<TaskBodyComponent task={stubTask2}/>)
        const wrapper = component.find('.TaskBodySegment .TaskBodyListDeadline')
        expect(wrapper.length).toBe(1)
    })

    it("should call edit deadline handler", ()=> {
        const component = mount(<TaskBodyComponent task={stubTask}/>)
        const wrapper1 = component.find('.TaskBodySegment .EditTaskButtonA #EditButtonTaskBody')
        wrapper1.simulate("click")
        const wrapper = component.find('Input #EditTaskFormDeadline')
        // console.log(component.debug())
        const event = { data: { value: "2020-11-12" } }
        wrapper.simulate("change", event)
    })

    it("should close when close clicked in editmode", ()=>{
        const component = mount(<TaskBodyComponent task={stubTask}/>)
        const wrapper1 = component.find('.TaskBodySegment .EditTaskButtonA #EditButtonTaskBody')
        wrapper1.simulate("click")
        const wrapper = component.find('.EditTaskCloseButton #EditTaskClose')
        // console.log(component.debug())
        wrapper.simulate("click")
    })

    it("should close when submit clicked in editmode", ()=>{
        const component = mount(<TaskBodyComponent task={stubTask}/>)
        const wrapper1 = component.find('.TaskBodySegment .EditTaskButtonA #EditButtonTaskBody')
        wrapper1.simulate("click")
        const wrapper = component.find('.EditTaskSubmitButton #EditTaskSubmit')
        // console.log(component.debug())
        wrapper.simulate("click")
    })

    it("should call edit title handler", ()=> {
        const component = mount(<TaskBodyComponent task={stubTask}/>)
        const wrapper1 = component.find('.TaskBodySegment .EditTaskButtonA #EditButtonTaskBody')
        wrapper1.simulate("click")
        const wrapper = component.find('Input #EditTaskFormTitle')
        // console.log(component.debug())
        const event = { data: { value: "title" } }
        wrapper.simulate("change", event)
    })
    
})