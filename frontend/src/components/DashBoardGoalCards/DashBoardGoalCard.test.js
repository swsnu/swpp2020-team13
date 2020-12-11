import React from 'react'
import { shallow, mount } from 'enzyme';
import GoalCard from './DashBoardGoalCard';
import { Router} from 'react-router-dom';
import { Provider } from 'react-redux'
import history from '../../history'
import moment from 'moment'
import { getMockStore } from '../../test-utils/mocks'

const stubInitialState = {
    auth: null,
    authModal: true,
    addTask: true
}
const mockStore = getMockStore(stubInitialState)

describe('goalcard', () => {

    let WrappedGoalCard
    let mockGoalDefault = {
        tasks: [
            {title: "title1", id:"1", deadline: (moment(new Date).startOf('day').unix() + 24*60*60), start_at : moment(new Date).startOf('day').unix(), day_of_week:["MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SUNDAY"] },
            {title: "title2", id:"2", deadline: (moment(new Date).startOf('day').unix() + 24*60*60), day_of_week:[""] }
        ],
        deadline: (moment(new Date).startOf('day').unix() + 24*60*60),
        title: "title",
        id: 1,
        tags: ["tags", "tag2", "tag3"],
    }
    
    beforeEach(() => {
      WrappedGoalCard = (
        <Provider store={mockStore}>
        <Router history={history}>
          <GoalCard goal={mockGoalDefault}/>
        </Router>
        </Provider>
      )
    })

    it("should render", ()=> {
        const component = mount(WrappedGoalCard)
        const wrapper = component.find(".DashGoalCardComp")
        expect(wrapper.length).toBe(2)
    })

    it("should handle edit click", ()=> {
        const component = mount(WrappedGoalCard)
        const wrapper = component.find(".DashGoalCardComp .DashEditGoal button")
        wrapper.simulate("click")
    })

    it("should handle delete click", ()=> {
        const component = mount(WrappedGoalCard)
        const wrapper = component.find(".DashGoalCardComp .DashDeleteGoal button")
        wrapper.simulate("click")
    })

});
