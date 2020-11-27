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
    authModal: false,
    goals:[],
    selectedGoal: null
}
const mockStore = getMockStore(stubInitialState);

describe('CreateGoal', () => {
    let WrappedCreate
    beforeEach(() => {
      WrappedCreate = (
        <Provider store={mockStore}>
            <Router history={history}>
          <CreateGoalComponent/>
          </Router>
        </Provider>
      )
    })
    let spyAddArticle = jest.spyOn(actionCreators, 'addGoal')
      .mockImplementation(ar => { return dispatch => {}; });

    it('should render without errors', ()=>{
        const component = mount(WrappedCreate)
        const wrapper = component.find(".FormCreate")
        expect(wrapper.length).toBe(1)
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
        const wrapper = component.find(".FormCreate .GoalSubmitButton button")
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
        const wrapper = component.find(".FormCreate .react-datepicker__input-container")
        const date = new Date
        wrapper.simulate("change", date)
        wrapper.simulate("click")
    })

    it("should accept changes in tag", ()=> {
        const component = mount(WrappedCreate)
        const wrapper = component.find(".FormCreate Dropdown")
        const event = {data:{value:"test"}}
        wrapper.simulate("change", event)
    })
});
