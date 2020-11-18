import React from 'react'
import { shallow, mount } from 'enzyme'
import Taskbar from './TaskBarComponent'

describe('<Taskbar />', ()=> {

    it("should render without errors", ()=> {
        let mockTask = {
            title:"title",
            day_of_week: ["Tuesday"],
            id: 1
        }
        const component = shallow(<Taskbar task={mockTask} />)
        const wrapper = component.find('.TaskBarListItem')
        expect(wrapper.length).toBe(1)

    })

    it('should render recurrent icon', ()=> {
        let mockTask = {
            title:"title",
            day_of_week: ["Tuesday"],
            id: 1
        }
        const component =shallow(<Taskbar task={mockTask}/>)
        let wrapper = component.find('#Recurrent')
        expect(wrapper.length).toBe(1)
    })    

    it('should not render recurrent icon when day of week is empty', ()=> {
        let mockTaskOnce = {
            title:"title",
            day_of_week: [],
            id: 1
        }
        const component =shallow(<Taskbar task={mockTaskOnce}/>)
        let wrapper = component.find('#Recurrent')
        expect(wrapper.length).toBe(0)
    })   
    
})