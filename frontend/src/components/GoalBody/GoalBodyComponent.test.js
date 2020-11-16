import React from 'react'
import { Router} from 'react-router-dom';
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import GoalBody from './GoalBodyComponent'
import { getMockStore } from '../../test-utils/mocks'
import history from '../../history'
import chai, { expect } from 'chai'

const stubInitialState = {
    auth: null,
    modal: {
        authModal: true,
        addTask: true
    }
}
const mockStore = getMockStore(stubInitialState);

describe('<Menubar />', () => {

    let WrappedGoalBody
    beforeEach(() => {
      WrappedGoalBody = (
        <Provider store={mockStore}>
        <Router history={history}>
          <GoalBody tasks={[""]} deadline={"2020-11-13"}/>
        </Router>
        </Provider>
      )
    })
  
    it("should render without errors", ()=> {
        const component = mount(WrappedGoalBody)
        const wrapper = component.find('.GoalBodySegment')
        // console.log(component.debug())
        expect(wrapper.length).eql(2)
    })

    it("should click delete button", ()=> {
        const component = mount(WrappedGoalBody)
        const wrapper = component.find('.DeleteGoalButtonA #DeleteButtonGoalBody')
        // console.log(component.debug())
        wrapper.simulate("click")
    })

    it("should click edit button", ()=> {
        const component = mount(WrappedGoalBody)
        const wrapper = component.find('.EditGoalButtonA #EditButtonGoalBody')
        // console.log(component.debug())
        wrapper.simulate("click")
    })

    it("should click addTask button", ()=> {
        const component = mount(WrappedGoalBody)
        const wrapper = component.find('.GoalBodyAddButton #AddButtonGoalBody')
        // console.log(component.debug())
        wrapper.simulate("click")
    })

    it("should render taskbar", ()=> {
        let WrappedGoalBodyWithTaskbar
        WrappedGoalBodyWithTaskbar = (
            <Provider store={mockStore}>
            <Router history={history}>
              <GoalBody tasks={[{title: "title", id:"1", deadline:"2020-12-31", day_of_week:[""] }]} deadline={"2020-11-13"}/>
            </Router>
            </Provider>
        )
        const component = mount(WrappedGoalBodyWithTaskbar)
        const wrapper = component.find('.TaskBarListItem')
        expect(wrapper.length).eql(2)
        // const tasks = wrapper.state().tasks;
        // expect(tasks).to.equal([{title: "title", id:"1", deadline:"2020-12-31", day_of_week:[""] }])
    })

    it("should have empty task state when props.tasks is empty", () => {
        let WrappedGoalBodyNullTask
        WrappedGoalBodyNullTask = (
            <Provider store={mockStore}>
            <Router history={history}>
              <GoalBody tasks={null} deadline={"2020-11-13"}/>
            </Router>
            </Provider>
        )
        const component = mount(WrappedGoalBodyNullTask)
        const wrapper = component.find(GoalBody.WrappedComponent).instance()
        const tasks = wrapper.state.tasks
        expect(tasks.length).eql(0)
    })


    it("should have non-empty task state", ()=> {
        let WrappedGoalBodyWithTaskbar
        WrappedGoalBodyWithTaskbar = (
            <Provider store={mockStore}>
            <Router history={history}>
              <GoalBody tasks={[
                  {title: "title1", id:"1", deadline:"2020-12-31", day_of_week:[""] },
                  {title: "title2", id:"2", deadline:"2020-12-31", day_of_week:[""] }
                  ]} deadline={"2020-11-13"}/>
            </Router>
            </Provider>
        )
        const component = mount(WrappedGoalBodyWithTaskbar)
        const wrapper = component.find(GoalBody.WrappedComponent).instance()
        const tasks = wrapper.state.tasks
        expect(tasks.length).eql(2)
    })

    afterEach(() => {
        jest.clearAllMocks()
      })

})
