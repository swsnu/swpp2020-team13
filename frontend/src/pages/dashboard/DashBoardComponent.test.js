import React from 'react'
import { shallow, mount } from 'enzyme'
import DashBoardComponent from './DashBoardComponent'


describe('<DashboardComponent />', ()=> {

    it("should render without errors", ()=> {
        const component = shallow(<DashBoardComponent />)
        const wrapper = component.find('.dashboard')
        // TODO: This is failing
        expect(wrapper.length).toBe(1)
    })
})