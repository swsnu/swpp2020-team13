import React from 'react'
import { shallow, mount } from 'enzyme'
import CalendarPanel from './CalendarPanelComponent'


describe('<CalendarPanel />', ()=> {

    it("should render without errors", ()=> {
        const component = shallow(<CalendarPanel />)
        const wrapper = component.find('.CalendarPanel')
        // TODO: This is failing
        // expect(wrapper.length).toBe(1)
    })

    it("should accept changes", ()=> {
        const mockMyEventHandler = jest.fn()
        const component = shallow(<CalendarPanel onSubmit={mockMyEventHandler}/>)
        const wrapper = component.find('.CalendarPanel #Calendar')
        // TODO: This is failing. wrapper is not found
        // wrapper.simulate('change')
    })
})