import React from 'react'
import { shallow, mount } from 'enzyme'
import EditTaskComponent from './EditTaskComponent'

const stubTask = {
    title: "test",
    deadline: "1000",
    importance: 2,
    day_of_week: []
}

describe('<EditTaskComponent />', ()=> {

    it("should render without errors", ()=> {
        const component = shallow(<EditTaskComponent tasks={[]}/>)
        const wrapper = component.find('.EditTaskComp')
        expect(wrapper.length).toBe(1)
    })

    it("should render without errors when not empty", ()=> {
        const component = shallow(<EditTaskComponent tasks={[stubTask]}/>)
        const wrapper = component.find('.EditTaskComp')
        expect(wrapper.length).toBe(1)
    })
})