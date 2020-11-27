import React from 'react'
import { shallow, mount } from 'enzyme'
import AddAccForm from './AddAccForm';

describe('AddAcc', () => {

    afterEach(()=>{
        jest.clearAllMocks()
    })
    it("should render without errors", ()=>{
        const component = mount(<AddAccForm/>)
        const wrapper = component.find(".AddAccForm")
        expect(wrapper.length).toBe(2)
    })

    it("should accept description change", ()=>{
        const component = mount(<AddAccForm/>)
        const wrapper = component.find(".AddAccForm .AddAccDes input")
        const event = {target:{value: "text"}}
        wrapper.simulate("change", event)
    })

    it("should accept file change", ()=>{
        const component = mount(<AddAccForm/>)
        // console.log(component.debug())
        const wrapper = component.find(".AddAccForm .AccPhoto")
        const fileContents = 'file contents';
        const file = new Blob([fileContents], {type : 'text/plain'}, {name: "name"});
        const event = {target:{files: [file]}}
        wrapper.simulate("change", event)
    })

    it("should not handle file when file is null", ()=>{
        const component = mount(<AddAccForm/>)
        // console.log(component.debug())
        const wrapper = component.find(".AddAccForm .AccPhoto")
        // const fileContents = 'file contents';
        // const file = new Blob([fileContents], {type : 'text/plain'}, {name: "name"});
        const event = {target:{files: null}}
        wrapper.simulate("change", event)
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
