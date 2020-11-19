import React from 'react'
import { Router} from 'react-router-dom';
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import Menubar from './MenuBarComponent'
import { getMockStore } from '../../test-utils/mocks'
import history from '../../history'

const stubInitialState = {
    auth: null,
    modal: {
        authModal: true
    }
}
const mockStore = getMockStore(stubInitialState);

describe('<Menubar />', () => {

    let WrappedMenubar
    beforeEach(() => {
      WrappedMenubar = (
        <Provider store={mockStore}>
        <Router history={history}>
          <Menubar />
        </Router>
        </Provider>
      )
    })
  
    it("should render without errors", ()=> {
        const component = mount(WrappedMenubar)
        const wrapper = component.find('.Sidebar')
        // console.log(component.debug())
        expect(wrapper.length).toBe(2)
    })

    it("should render home icon", ()=> {
        const component = mount(WrappedMenubar)
        const wrapper = component.find('.Sidebar #MainButton')
        wrapper.simulate("click")
    })

    it("should render create icon", ()=> {
        const component = mount(WrappedMenubar)
        const wrapper = component.find('.Sidebar #CreateButton')
        wrapper.simulate("click")
    })

    it("should render dash icon", ()=> {
        const component = mount(WrappedMenubar)
        const wrapper = component.find('.Sidebar #DashButton')
        wrapper.simulate("click")
    })

    it("should render explore icon", ()=> {
        const component = mount(WrappedMenubar)
        const wrapper = component.find('.Sidebar #ExpButton')
        wrapper.simulate("click")
    })

    it("should render profile icon", ()=> {
        const component = mount(WrappedMenubar)
        const wrapper = component.find('.Sidebar #ProfileButton')
        wrapper.simulate("click")
    })

    it("should render logout icon", ()=> {
        const component = mount(WrappedMenubar)
        const wrapper = component.find('.Sidebar #LogoutButton')
        wrapper.simulate("click")
    })
})
