import React from 'react'
import { shallow, mount } from 'enzyme'
import Taskbar from './TaskBarComponent'

describe('<Taskbar />', ()=> {

    it("should render without errors", ()=> {
        const component = shallow(<Taskbar day_of_week={["Tuesday"]} />)
        const wrapper = component.find('.TaskBarListItem')
        expect(wrapper.length).toBe(1)

    })

    it('should render recurrent icon', ()=> {
        const component =shallow(<Taskbar day_of_week={["Tuesday"]}/>)
        let wrapper = component.find('#Recurrent')
        expect(wrapper.length).toBe(1)
    })    

    it('should not render recurrent icon when day of week is empty', ()=> {
        const component =shallow(<Taskbar day_of_week={[""]}/>)
        let wrapper = component.find('#Recurrent')
        expect(wrapper.length).toBe(0)
    })   
    
})