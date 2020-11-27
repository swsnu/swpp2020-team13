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

    afterEach(() => {
        jest.clearAllMocks();
    });
  
    it("should render without errors", ()=> {
        const component = mount(WrappedEdit)
        const wrapper = component.find('.EditGoalForm')
        // console.log(component.debug())
        expect(wrapper.length).toBe(2)
    })

    it("should click confirm button", ()=> {
        const component = mount(WrappedEdit)
        const title = component.find('#EditGoalFormTitle .ui input')
        title.at(0).simulate('change', {data:{value: "TEST_TITLE"}})
        
        const date = component.find('.DeadlinePicker')
        const testnewdate = new Date('December 17, 2020 03:24:00');;
        date.at(0).simulate("change", { target: { selected:testnewdate } });
        // TODO: this does not seem to work.
        
        const confirm = component.find('.ConfirmButton #ConfirmButtonEditGoalForm')
        console.log(confirm.debug())
        confirm.at(0).simulate("click");
    })
    
    // TODO: fileChange and onTagChange should be simulated and tested

})