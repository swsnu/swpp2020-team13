import React from 'react'
import { Router} from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import Taskbar from './TaskBarComponent'
import { getMockStore } from '../../test-utils/mocks'
import { Provider } from 'react-redux'
import history from '../../history'

const stubInitialState = {
    auth: null,
    authModal: true,
    addTask: true
}
const mockStore = getMockStore(stubInitialState)

describe('<Taskbar />', ()=> {

    let WrappedTaskBar
    let mockTask = {
        title:"title",
        day_of_week: ["Tuesday"],
        id: 1
    }

    beforeEach(() => {
      WrappedTaskBar = (
        <Provider store={mockStore}>
        <Router history={history}>
          <Taskbar task={mockTask}/>
        </Router>
        </Provider>
      )
    })

    it("should render without errors", ()=> {
        let mockTask = {
            title:"title",
            day_of_week: ["Tuesday"],
            id: 1
        }
        const component = mount(WrappedTaskBar)
        const wrapper = component.find('.TaskBarListItem')
        expect(wrapper.length).toBe(2)

    })

    it('should render recurrent icon', ()=> {
        let mockTask = {
            title:"title",
            day_of_week: ["Tuesday"],
            id: 1
        }
        const component = mount(WrappedTaskBar)
        let wrapper = component.find('#Recurrent')
        expect(wrapper.length).toBe(2)
    })    

    it('should not render recurrent icon when day of week is empty', ()=> {

        let WrappedTaskBar2
        let mockTask = {
            title:"title",
            day_of_week: [],
            id: 1
        }

        WrappedTaskBar2 = (
            <Provider store={mockStore}>
            <Router history={history}>
              <Taskbar task={mockTask}/>
            </Router>
            </Provider>
          )

        const component = mount(WrappedTaskBar2)
        let wrapper = component.find('#Recurrent')
        expect(wrapper.length).toBe(0)
    })   
    
})