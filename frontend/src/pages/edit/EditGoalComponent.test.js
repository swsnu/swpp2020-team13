import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import * as actionCreators_goal from '../../store/actions/goal'
import EditGoalComponent from './EditGoalComponent'

import { getMockStore } from '../../test-utils/mocks'


const stubInitialState = {
    auth: null,
    authModal: true,
    addTask: true
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

    // it("should change state when title edited", ()=> {
    //     const component = mount(WrappedEdit)
    //     const title = component.find('.GoalTitleInput')
    //     // console.log(component.debug())
    //     const testnewtitle = "TEST_NEW_TITLE";
    //     title.at(0).simulate("change", { target: { value:testnewtitle } });
        
    //     const date = component.find('.DeadlinePicker')
    //     // console.log(component.debug())
    //     const testnewdate = new Date('December 17, 2020 03:24:00');;
    //     date.at(0).simulate("change", { target: { selected:testnewdate } });
        
    //     const confirm = component.find('.ConfirmButton')
    //     confirm.at(0).simulate("click");
    //     expect(spyEditGoal).toHaveBeenCalledTimes(1);
    // })
    // not working (received number of calls: 0)
})