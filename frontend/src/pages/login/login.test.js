/* eslint-disable no-unused-expressions */
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import chai, { expect } from 'chai'
import { Router, Route, Redirect, Switch } from 'react-router-dom';
// import sinon from 'sinon'
// import sinonChai from 'sinon-chai'
import * as actionCreators from '../../store/actions/index'
import Login from './index'
import history from '../../history'

import { getMockStore } from '../../test-utils/mocks'

// chai.use(sinonChai)

const stubInitialState = {
    auth: null,
    modal: {
      authModal: true
    }
}
const mockStore = getMockStore(stubInitialState);

describe('<Login />', () => {
  let WrappedLogin
  location = { pathname: '/'}
  beforeEach(() => {
    WrappedLogin = (
      <Provider store={mockStore} history={history}>
        <Login location={location} />
      </Provider>
    )
  })

// TODO : not working
  // it('should return form when isUserLoggedIn is true', ()=> {
  //   const stubInitialStateLogin = {
  //       auth: {
  //           id: "1",
  //           username: "login"
  //       },
        
  //           auth: false,
  //           addTask: false
    
  //   }
  //   const mockStoreLogin = getMockStore(stubInitialStateLogin);
  //   let WrappedLoginTrue = (
  //           <Provider store={mockStoreLogin}>
  //               <Login />
  //           </Provider>
  //   )
  //     const component = mount(WrappedLoginTrue)
  //     const wrapper = component.find('.Redirect')
  //     expect(wrapper).to.have.lengthOf(1)
  //   }) 

  it('should return form when isUserLoggedIn is false', ()=> {
      const component = mount(WrappedLogin)
      // console.log(component.debug())
      const wrapper = component.find('.FormLogin')
      expect(wrapper).to.have.lengthOf(2)
  })

  it('should simulate signup click', ()=> {
    const component = mount(WrappedLogin)
    const wrapper = component.find('.ButtonGroup .Button #ButtonSignup')
    wrapper.simulate('click')
    })

    it('should simulate login click', ()=> {
        const component = mount(WrappedLogin)
        const wrapper = component.find('.ButtonGroup .Button #ButtonLogin')
        wrapper.simulate('click')
    })


  afterEach(() => {
    jest.clearAllMocks()
  })
//   sinon.spy(history, "push")

})