import React from 'react'
import { shallow, mount } from 'enzyme';
import DefaultAccSegment from './DefaultAccSeg';

describe('DefaultAch', () => {
    it('should render without errors', ()=>{
        const component = shallow(<DefaultAccSegment/>)
        const wrapper = component.find(".DefaultAchSegment")
        expect(wrapper.length).toBe(1)
    })

    it('should handle addAcc', ()=>{
        const component = mount(<DefaultAccSegment/>)
        const wrapper = component.find(".DefaultAchSegment .DefaultAchAddButton button")
        wrapper.simulate("click")
    })
    
    it("should pass onsubmit to AddAcc", ()=>{
        const component = mount(<DefaultAccSegment/>)
        const wrapper = component.find(".DefaultAchSegment .DefaultAchAddButton button")
        wrapper.simulate("click")
        const wrapper_add = component.find(".AddAccForm .AddAccCloseButton button")
        expect(wrapper_add.length).toBe(1)
        wrapper_add.simulate("click")
    })
});
