import React from 'react'
import { mount } from 'enzyme'
import {CreateAuthForm} from './index'
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
          <CreateAuthForm/>
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

      let WrappedLoginForm
        WrappedLoginForm = (
          <Provider store={mockStore}>
            <CreateAuthForm authMode={'login'}/>
          </Provider>
        )

      const component = mount(WrappedLoginForm)
      const wrapper = component.find('.LoginSegment')
      console.log(component.debug())
      expect(wrapper.length).toBe(0)
  })

  it("should accept username input", ()=> {
    const component = mount(WrappedAuthForm)
    const wrapper = component.find('.signupForm input')
    wrapper.at(0).simulate('change', { target: { value: 'Hello' } })
})

it("should accept password input", ()=> {
  const component = mount(WrappedAuthForm)
  const wrapper = component.find('.signupForm input')
  wrapper.at(1).simulate('change', { target: { value: 'Hello' } })
})


    // Simulating submit not working properly - onError is called
    it("should handle submit", ()=> {
      const component = mount(WrappedAuthForm)
      const wrapper = component.find('.signupForm form')
        const data = {
          username: "username",
          email: "email@email.com",
          password1: "password",
          password_confirm: "password_confirm",
        }
       act(() => {
          wrapper.simulate("submit", data)
        })
      })

    afterEach(() => {
        jest.clearAllMocks()
      })
});
