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

    afterEach(() => {
        jest.clearAllMocks()
      })

})
