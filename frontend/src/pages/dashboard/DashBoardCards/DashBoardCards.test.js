import React from 'react'
import { shallow } from 'enzyme';
import { getMockStore } from '../../../test-utils/mocks'
import DashBoardCards from './DashBoardCardsComponent';

const stubInitialState = {
    auth: null,
}

const mockStore = getMockStore(stubInitialState)

describe('DashboardGoalcards', () => {
    it("should render, ", ()=>{
        const component = shallow(<DashBoardCards goalCardList={[]}/>)
        const wrapper = component.find(".DashBoardGoalCards")
        expect(wrapper.length).toBe(1)
    })

    it("should click next -> prevhandler, ", ()=>{
        const component = shallow(<DashBoardCards goalCardList={[]}/>)
        const wrapper_n = component.find(".DashBoardGoalCards .dashcardnext")
        wrapper_n.simulate("click")
        const wrapper = component.find(".DashBoardGoalCards .dashcardprev")
        wrapper.simulate("click")
    })

});
