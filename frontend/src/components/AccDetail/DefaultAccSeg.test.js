import React from 'react'
import { shallow, mount } from 'enzyme'
import DefaultAccSeg from './DefaultAccSeg'
import chai, { expect } from 'chai'

describe('<DefaultAccSeg />', () => {

    const mockTask = {
        title: "TEST TASK",
        importance: 5,
    }
  
    it("should render without errors", ()=> {
        const component = shallow(<DefaultAccSeg/>)
        const wrapper = component.find(".DefaultAccSeg")
        expect(wrapper.length).eql(1)
    })

    it("should call onClickAddAccHandler", ()=> {
        const component = mount(<DefaultAccSeg/>)
        const button = component.find('.AddAccButton')
        button.at(0).simulate('click');
        const wrapper = component.find('AddAccForm')
        expect(wrapper.length).eql(1)
    })
})
