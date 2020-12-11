import React from 'react'
import { shallow, mount } from 'enzyme'
import AddAccForm from './AddAccForm';
import { getMockStore } from '../../test-utils/mocks'
import { Provider } from 'react-redux'
import history from '../../history'
import { Router} from 'react-router-dom';

const stubInitialState = {
    auth: null,
    authModal: true,
    addTask: true
}
const mockStore = getMockStore(stubInitialState)

describe('AddAcc', () => {

    let WrappedAddAcc
    
    beforeEach(() => {
      WrappedAddAcc = (
        <Provider store={mockStore}>
        <Router history={history}>
          <AddAccForm onSubmit={()=>{}}/>
        </Router>
        </Provider>
      )
    })

    afterEach(()=>{
        jest.clearAllMocks()
    })
    it("should render without errors", ()=>{
        const component = mount(WrappedAddAcc)
        const wrapper = component.find(".AddAccForm")
        expect(wrapper.length).toBe(4)
    })

    it("should accept description change", ()=>{
        const component = mount(WrappedAddAcc)
        const wrapper = component.find(".AddAccForm .AddAccDes input")
        const event = {target:{value: "text"}}
        wrapper.simulate("change", event)
    })

    it("should accept file change", ()=>{
        const component = mount(WrappedAddAcc)
        // console.log(component.debug())
        const wrapper = component.find(".AddAccForm .AccPhoto")
        global.URL.createObjectURL = jest.fn();
        const fileContents = 'file contents'
        const file = new Blob([fileContents], {type : 'text/plain'}, {name: "name"});
        const event = {target:{files: [file]}}
        wrapper.simulate("change", event)
    })

    it("should not handle file when file is null", ()=>{
        const component = mount(WrappedAddAcc)
        // console.log(component.debug())
        const wrapper = component.find(".AddAccForm .AccPhoto")
        // const fileContents = 'file contents';
        // const file = new Blob([fileContents], {type : 'text/plain'}, {name: "name"});
        const event = {target:{files: null}}
        wrapper.simulate("change", event)
    })

    it("should handle file submit", ()=>{
        const component = mount(WrappedAddAcc)
        // console.log(component.debug())
        const wrapper = component.find(".AddAccForm .AddAccSubmitButton button")
        wrapper.simulate("click")
    })

    it("should handle file submit in edit", ()=>{
        let WrappedAddAcc_edit = (
            <Provider store={mockStore}>
            <Router history={history}>
              <AddAccForm onSubmit={()=>{}} achievement={{percentage_complete: 0}}/>
            </Router>
            </Provider>
          )
        const component = mount(WrappedAddAcc_edit)
        // console.log(component.debug())
        const wrapper = component.find(".AddAccForm .AddAccSubmitButton button")
        wrapper.simulate("click")
    })

    it("should handle close", ()=>{
        const component = mount(WrappedAddAcc)
        // console.log(component.debug())
        const wrapper = component.find(".AddAccForm .AddAccCloseButton button")
        wrapper.simulate("click")
    })

    // it("should accept file change with preview  ", ()=>{
    //     const component = mount(<AddAccForm/>)
    //     // console.log(component.debug())
    //     const wrapper = component.find(".AddAccForm #AccPhoto")
    //     const fileContents = 'file contents';
    //     const file = new Blob([fileContents], {type : 'text/plain'}, {name: "name"})
    //     const mockFileReader = {result: "result", readAsDataURL: jest.fn()}
    //     window.FileReader = jest.fn(()=>mockFileReader)
    //     const event = {target:{files: [file]}}
    //     wrapper.simulate("change", event)
    // })

});
