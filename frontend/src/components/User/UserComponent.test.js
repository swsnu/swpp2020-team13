import React from 'react'
import { shallow, mount } from 'enzyme'
import User from './UserComponent'

describe('<User />', ()=> {

    it("should render without errors", ()=> {
        const component = shallow(<User />)
        // console.log(component.debug())
        const wrapper = component.find('#UserProfile')
        expect(wrapper.length).toBe(1)

    })
    
})