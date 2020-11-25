import React from 'react'
import { Modal } from './Modal'
import { getMockStore } from '../../../test-utils/mocks'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
const stubInitialState = {
    auth: null,
    authModal: true,
}

const mockStore = getMockStore(stubInitialState)

// jest.mock('../../Auth/AuthForm/index', ()=>{
//     return jest.fn(props => {
//         return(
//             <div className="spySignup"></div>
//         )
//     })
// })

describe('Modal', () => {
    let modal
    beforeEach(() => {
      modal = (
        <Provider store={mockStore}>
          <Modal isOpen={true}/>
        </Provider>
      )
    })

    afterEach(()=> {
        jest.clearAllMocks()
    })

    it("should render no children", ()=>{
        const component = mount(modal)
        const wrapper = component.find("#reactModal")
        expect(wrapper.length).toBe(3)
    })

    it("should accept click", ()=> {
        const component = mount(modal)
        console.log(component.debug())
        const wrapper = component.find("#reactModal .modal__close-btn #closeButton")
        wrapper.simulate("click")
    })
});
