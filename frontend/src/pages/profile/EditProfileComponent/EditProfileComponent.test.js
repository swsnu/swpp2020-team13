import React from 'react'
import { shallow, mount } from 'enzyme'
import EditProfile from './EditProfileComponent';


describe('<EditProfileComponent />', ()=> {

    it("should render without errors", ()=> {
        const component = shallow(<EditProfile />)
        const wrapper = component.find('.EditProfile')
        expect(wrapper.length).toBe(1)
    })
})