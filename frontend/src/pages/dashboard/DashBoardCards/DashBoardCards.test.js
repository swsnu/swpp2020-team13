import React from 'react'
import { shallow } from 'enzyme';
import { DashBoardCards } from './DashBoardCardsComponent';

describe('DashboardGoalcards', () => {
    it("should render, ", ()=>{
        const component = shallow(<DashBoardCards/>)
        const wrapper = component.find(".DashBoardGoalCards")
        expect(wrapper.length).toBe(1)
    })

    it("should click next -> prevhandler, ", ()=>{
        const component = shallow(<DashBoardCards/>)
        const wrapper_n = component.find(".DashBoardGoalCards .dashcardnext")
        wrapper_n.simulate("click")
        const wrapper = component.find(".DashBoardGoalCards .dashcardprev")
        wrapper.simulate("click")
    })

});
