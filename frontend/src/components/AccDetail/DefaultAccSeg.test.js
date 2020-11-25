import React from 'react'
import { shallow, mount } from 'enzyme'
import DefaultAccSeg from './DefaultAccSeg'

describe('<DefaultAccSeg />', () => {
  
    it("should render without errors", ()=> {
        const component = mount(<DefaultAccSeg/>)
        const wrapper = component.find(".DefaultAccSeg")
        expect(wrapper.length).toBe(1)
    })

    it("should call onClickAddAccHandler", ()=> {
        const component = mount(<DefaultAccSeg/>)
        const button = component.find('.AddAccButton')
        button.at(0).simulate('click');
        const wrapper = component.find('AddAccForm')
        expect(wrapper.length).toBe(1)
    })
})
