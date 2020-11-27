import React from 'react'
import { mount } from 'enzyme'
import {CreateSignupForm, CreateLoginForm} from './index'
import { getMockStore } from '../../../test-utils/mocks'
import { Provider } from 'react-redux'
import * as actionCreators from '../../../store/actions/auth'
import { act } from 'react-dom/test-utils'

const stubInitialState = {
    auth: null,
    modal: {
        authModal: true,
        addTask: true
    }
}
const mockStore = getMockStore(stubInitialState);

describe('AuthForm', () => {

    let WrappedAuthForm
    beforeEach(() => {
      WrappedAuthForm = (
        <Provider store={mockStore}>
          <CreateSignupForm/>
        </Provider>
      )
    })

    it("should render without errors", ()=> {
        const component = mount(WrappedAuthForm)
        const wrapper = component.find('.signupForm')
        console.log(component.debug())
        expect(wrapper.length).toBe(2)
    })

    it("should render without errors", ()=> {
      let WrappedAuthLoginForm = (
        <Provider store={mockStore}>
          <CreateLoginForm/>
        </Provider>
      )
      const component = mount(WrappedAuthLoginForm)
      const wrapper = component.find('.LoginSegment')
      console.log(component.debug())
      expect(wrapper.length).toBe(2)
  })

    // Simulating submit not working properly - onError is called
    it("should handle submit", ()=> {
      const component = mount(WrappedAuthForm)
      const wrapper = component.find('.signupForm form')
        const data = {
          username: "username",
          email: "email@email.com",
          password1: "password1",
          password2: "password2",
        }
       act(() => {
          wrapper.simulate("submit", data)
        })
      })

    afterEach(() => {
        jest.clearAllMocks()
      })
});
