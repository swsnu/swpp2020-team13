import React from 'react'
import {DashBoardPanel}  from './DashBoardPanelComponent';
import { mount, shallow } from 'enzyme';

describe('DashBoardPanel', () => {
    it('should render without errors', ()=>{
        const component = shallow(<DashBoardPanel/>)
        console.log(component.debug())
        const wrapper = component.find(".DashBoardPanel")
        expect(wrapper.length).toBe(1)
    })
})
