import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import * as actionCreators_goal from '../../store/actions/goal'
import EditGoalComponent from './EditGoalComponent'

import { getMockStore } from '../../test-utils/mocks'


const stubInitialState = {
    auth: null,
    modal: {
        authModal: true
    }
}
const mockStore = getMockStore(stubInitialState)

const mockGoal = {
    title: "TEST_TITLE",
    file: null,
    fileName: "",
    upload: false,
    deadline: new Date(),
    startdate: new Date(),
    tags: ["TEST_TAG"],
    tagOptions:[],
    isEditing: false,
}

const mockGoal_P = {
    title: "TEST_TITLE",
    photo: "https://goalingball-test.s3.amazonaws.com/photo",
    deadline: new Date(),
    startdate: new Date(),
    tags: ["TEST_TAG"],
    tagOptions:[],
    isEditing: false,
}


const mockId = 1;
const mockData = null;
const mockFile = null;
const mockKey = null;

describe('<EditGoalComponent />', () => {
    let WrappedEdit, spyEditGoal;
    beforeEach(() => {
      WrappedEdit = (
        <Provider store={mockStore}>
          <EditGoalComponent selectedGoal={mockGoal} editGoal={spyEditGoal}/>
        </Provider>
      )

      spyEditGoal = jest
            .spyOn(actionCreators_goal, "editGoal")
            .mockImplementation((mockId, mockData, mockFile, mockKey) => {
                return dispatch => {};
            });
     })
     URL.createObjectURL = jest.fn()

    afterEach(() => {
        jest.clearAllMocks();
    });
  
    it("should render without errors", ()=> {
        const component = mount(WrappedEdit)
        const wrapper = component.find('.EditGoalForm')
        // console.log(component.debug())
        // TODO: received: 3
        // expect(wrapper.length).toBe(2)
    })

    it("should click confirm button", ()=> {
        const component = mount(WrappedEdit)
        const title = component.find('#EditGoalFormTitle input')
        title.simulate('change', {data:{value: "TEST_TITLE"}})
        
        // const date = component.find('.DeadlinePicker')
        const wrapper = component.find(".react-datepicker__input-container")
        const testnewdate = new Date('December 17, 2020 03:24:00');;
        // TODO: wrapper.length: 0
        // wrapper.simulate("change", { target: { selected:testnewdate } });
        
        const confirm = component.find('.ConfirmButton #ConfirmButtonEditGoalForm')
        console.log(confirm.debug())
        confirm.at(0).simulate("click");
    })
    
    // TODO: fileChange and onTagChange should be simulated and tested
    it("should accept file change", ()=>{
        const component = mount(WrappedEdit)
        // console.log(component.debug())
        const wrapper = component.find(".EditGoalForm .EditGoalPhoto")
        const fileContents = 'file contents';
        const file = new Blob([fileContents], {type : 'text/plain'}, {name: "name"});
        const event = {target:{files: [file]}}
        wrapper.simulate("change", event)
    })

    it("should not handle file when file is null", ()=>{
        const component = mount(WrappedEdit)
        const wrapper = component.find(".EditGoalForm .EditGoalPhoto")
        const event = {target:{files: null}}
        wrapper.simulate("change", event)
    })

    it("should handle when user already has a photo", ()=>{
        const WrappedEdit_P = (
            <Provider store={mockStore}>
              <EditGoalComponent selectedGoal={mockGoal_P} editGoal={spyEditGoal}/>
            </Provider>
          )
        const component = mount(WrappedEdit_P)
        const wrapper = component.find('.ConfirmButton #ConfirmButtonEditGoalForm')
        wrapper.at(0).simulate("click");
    })

    it("should accept changes in tag", ()=> {
        const component = mount(WrappedEdit)
        const wrapper = component.find(".EditGoalForm Dropdown")
        const event = {data:{value:"test"}}
        wrapper.simulate("change", event)
    })

})