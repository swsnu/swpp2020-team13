import React from 'react'
import { Router} from 'react-router-dom';
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import GoalBody from './GoalBodyComponent'
import { getMockStore } from '../../test-utils/mocks'
import history from '../../history'
import chai, { expect } from 'chai'
import moment from 'moment'

const stubInitialState = {
    auth: null,
    authModal: true,
    addTask: true
}
const mockStore = getMockStore(stubInitialState)

describe('<GoalBody />', () => {

    let WrappedGoalBody
    let mockGoalDefault = {
        tasks: [
            {title: "title1", id:"1", deadline: (moment(new Date).startOf('day').unix() + 24*60*60), start_at : moment(new Date).startOf('day').unix(), day_of_week:["MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SUNDAY"] },
            {title: "title2", id:"2", deadline:"2020-12-31", day_of_week:[""] }
        ],
        deadline: (moment(new Date).startOf('day').unix() + 24*60*60),
        title: "title",
        id: 1,
        tags: ["tags"],
    }
    
    beforeEach(() => {
      WrappedGoalBody = (
        <Provider store={mockStore}>
        <Router history={history}>
          <GoalBody goal={mockGoalDefault}/>
        </Router>
        </Provider>
      )
    })

    it("should render addtask modal", ()=> {
        const component = mount(WrappedGoalBody)
        const wrapper = component.find(".SegmentAddTask")
        expect(wrapper.length).eql(0)
    })

  
    it("should render without errors", ()=> {
        const component = mount(WrappedGoalBody)
        const wrapper = component.find('.GoalBodySegment')
        // console.log(component.debug())
        expect(wrapper.length).eql(2)
    })

    it("should click delete button", ()=> {
        const component = mount(WrappedGoalBody)
        const wrapper = component.find('#DeleteButtonGoalBody button')
        // console.log(component.debug())
        wrapper.simulate("click")
    })

    it("should click edit button", ()=> {
        const component = mount(WrappedGoalBody)
        const wrapper = component.find('#EditButtonGoalBody button')
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
        let mockGoal = {
            tasks: [
                {title: "title1", id:"1", deadline:"2020-12-31",start_at: 1577750400, deadline: 1609372800, day_of_week:["MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY"] },
                {title: "title2", id:"2", deadline:"2020-12-31",start_at: 1577750400, deadline: 1609372800,day_of_week:["MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY"] }
            ],
            start_at: 1577750400,
            deadline: 1609372800,
            title: "",
            id: 1,
            tags: ["tags"],
        }
        WrappedGoalBodyWithTaskbar = (
            <Provider store={mockStore}>
            <Router history={history}>
              <GoalBody goal={mockGoal}/>
            </Router>
            </Provider>
        )
        const component = mount(WrappedGoalBodyWithTaskbar)
        const wrapper = component.find('.TaskBarListItem')
        expect(wrapper.length).eql(0)
        // const tasks = wrapper.state().tasks;
        // expect(tasks).to.equal([{title: "title", id:"1", deadline:"2020-12-31", day_of_week:[""] }])
    })


    afterEach(() => {
        jest.clearAllMocks()
      })

})
