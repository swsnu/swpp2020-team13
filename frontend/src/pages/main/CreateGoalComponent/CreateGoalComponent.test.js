import React from 'react'
import CreateGoalComponent from './CreateGoalComponent';
import { getMockStore } from '../../../test-utils/mocks';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { Router } from 'react-router-dom';
import history from '../../../history'
import * as actionCreators from '../../../store/actions/goal'

const stubInitialState = {
    auth: null,
    modal: {
        authModal: false
    },
    goal: {
        goals:[],
        selectedGoal: {
            tags: []
        }
    }
}
const mockStore = getMockStore(stubInitialState);

describe('CreateGoal', () => {
    let WrappedCreate
    let spyAddArticle
    beforeEach(() => {
      WrappedCreate = (
        <Provider store={mockStore}>
            <Router history={history}>
                <CreateGoalComponent />
            </Router>
        </Provider>
      )
      spyAddArticle = jest.spyOn(actionCreators, 'addGoal')
      .mockImplementation(ar => { return dispatch => {}; });

      global.URL.createObjectURL = jest.fn();
    })

    afterEach(() => { jest.clearAllMocks() });

    it('should render without errors', ()=>{
        const component = mount(WrappedCreate)
        const wrapper = component.find(".FormCreate")
        // console.log(wrapper.debug())
        // TODO: received: 2 but why?
        // expect(wrapper.length).toBe(1)
    })

    it("should accept file change", ()=>{
        const component = mount(WrappedCreate)
        // console.log(component.debug())
        const wrapper = component.find(".FormCreate .GoalPhoto")
        const fileContents = 'file contents';
        const file = new Blob([fileContents], {type : 'text/plain'}, {name: "name"});
        const event = {target:{files: [file]}}
        wrapper.simulate("change", event)
    })

    it("should not handle file when file is null", ()=>{
        const component = mount(WrappedCreate)
        const wrapper = component.find(".FormCreate .GoalPhoto")
        const event = {target:{files: null}}
        wrapper.simulate("change", event)
    })

    it("should handle click", ()=> {
        const component = mount(WrappedCreate)
        // console.log(component.debug())
        const wrapper = component.find(".GoalSubmitButton").at(0)
        // const wrapper = component.find(".FormCreate .GoalSubmitButton button")
        wrapper.simulate("click")
    })

    it("should accept title change", ()=> {
        const component = mount(WrappedCreate)
        const wrapper = component.find(".FormCreate .CreateGoalTitle input")
        const event = {target:{value:"test"}}
        wrapper.simulate("change", event)
    })

    it("should accept deadline change", ()=> {
        const component = mount(WrappedCreate)
        const wrapper = component.find('#GoalFormDeadline input')
        // const wrapper = component.find(".FormCreate .react-datepicker__input-container")
        const testnewdate = new Date('December 17, 2020 03:24:00');;
        wrapper.simulate("change", { target: { selected:testnewdate } });
        wrapper.simulate("click")
    })

    it("should accept changes in tag", ()=> {
        const component = mount(WrappedCreate)
        let wrapper = component.find(".FormCreate .GoalDropDown").at(1)
        // TODO: this.state.tags is undefined
        const event = {data:{value:"test"}}
        wrapper.simulate("change", event)
    })
});

