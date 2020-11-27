import React from 'react'
import { shallow } from 'enzyme';
import GoalCard from './DashBoardGoalCard';

describe('goalcard', () => {
    it("should render", ()=> {
        const component = shallow(<GoalCard/>)
        const wrapper = component.find(".DashGoalCardComp")
        expect(wrapper.length).toBe(1)
    })
});
