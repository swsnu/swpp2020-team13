import React from 'react'
import { shallow, mount } from 'enzyme'
import CalendarPanel from './CalendarPanelComponent'


describe('<CalendarPanel />', ()=> {

    it("should render without errors", ()=> {
        const component = shallow(<CalendarPanel goalList={[]}/>)
        const wrapper = component.find('.CalendarPanel')
        expect(wrapper.length).toBe(1)
    })

    it("should accept changes", ()=> {
        const mockMyEventHandler = jest.fn()
        const component = shallow(<CalendarPanel onSubmit={mockMyEventHandler} goalList={[]}/>)
        const wrapper = component.find('.CalendarPanel #Calendar')
        wrapper.simulate('change')
    })
})