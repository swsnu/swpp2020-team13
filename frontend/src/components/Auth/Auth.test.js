import React from 'react'
import { Router} from 'react-router-dom';
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import Auth from './Auth'
import { getMockStore } from '../../test-utils/mocks'
import history from '../../history'
import chai, { expect } from 'chai'

const stubInitialState = {
    auth: null,
    modal: {
        auth: true,
        addTask: true
    }
}
const mockStore = getMockStore(stubInitialState);

describe('<Auth />', () => {

    let WrappedAuth
    beforeEach(() => {
      WrappedAuth = (
        <Provider store={mockStore}>
          <Auth authMode={''}/>
        </Provider>
      )
    })
  
    it("should render without errors", ()=> {
        const component = mount(WrappedAuth)
        const wrapper = component.find('.SegmentModal')
        // console.log(component.debug())
        expect(wrapper.length).eql(2)
    })

    fit("should show the sign up modal when the button is clicked", ()=> {
      const component = mount(WrappedAuth)
      const wrapper = component.find('#AuthSignup')
      wrapper.simulate('click')
      // TODO: expect(setAuthMode).toHaveBeenCalledTimes(1)
      // expect(authMode).toBe('signup')
      // // console.log(component.debug())
      // expect(wrapper.length).eql(2)
    })

    xit("should show the log in modal when the button is clicked", ()=> {
      // const component = mount(WrappedAuth)
      // const wrapper = component.find('.SegmentModal')
      // // console.log(component.debug())
      // expect(wrapper.length).eql(2)
    })

    xit("should switch between sign up and log in", ()=> {
      // const component = mount(WrappedAuth)
      // const wrapper = component.find('.SegmentModal')
      // // console.log(component.debug())
      // expect(wrapper.length).eql(2)
    })

    xit("should handle submit", ()=> {
      // const component = mount(WrappedAuth)
      // const wrapper = component.find('.SegmentModal')
      // // console.log(component.debug())
      // expect(wrapper.length).eql(2)
    })

    // should reset the input fields when the form is switched

    afterEach(() => {
        jest.clearAllMocks()
      })

})
