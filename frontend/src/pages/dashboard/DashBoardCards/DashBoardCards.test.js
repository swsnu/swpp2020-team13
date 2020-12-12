import React from 'react'
import { shallow } from 'enzyme';
import { getMockStore } from '../../../test-utils/mocks'
import DashBoardCards from './DashBoardCardsComponent';
import moment from 'moment'

const stubInitialState = {
    auth: null,
}

const mockStore = getMockStore(stubInitialState)

describe('DashboardGoalcards', () => {

    const start_at_1 = moment(new Date).startOf('day').unix() - 1
    const deadline_1 = moment(new Date).startOf('day').unix() + 24*60*60 + 1
    const start_at_2 = moment(new Date).startOf('day').unix() + 100
    const deadline_2 = moment(new Date).startOf('day').unix() + 24*60*60 + 100

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

    it("should render select 1 ", ()=>{
        const component = shallow(<DashBoardCards goalCardList={[]}/>)
        const wrapper = component.find(".DashBoardGoalCards Dropdown")
        const event = {data:{value:1}}
        const data = {value:1}
        wrapper.simulate("change", event, data)
        // expect(wrapper.length).toBe(1)
    })

    it("should render select 2 ", ()=>{
        const component = shallow(<DashBoardCards goalCardList={[{start_at: start_at_1, deadline: deadline_1}, {start_at: start_at_2, deadline: deadline_2}]}/>)
        const wrapper = component.find(".DashBoardGoalCards Dropdown")
        const event = {data:{value:2}}
        const data = {value:2}
        wrapper.simulate("change", event, data)
        // expect(wrapper.length).toBe(1)
    })

    it("should render select 3 ", ()=>{
        const component = shallow(<DashBoardCards goalCardList={[{start_at: start_at_1, deadline: deadline_1}, {start_at: start_at_2, deadline: deadline_2}]}/>)
        const wrapper = component.find(".DashBoardGoalCards Dropdown")
        const event = {data:{value:3}}
        const data = {value:3}
        wrapper.simulate("change", event, data)
        // expect(wrapper.length).toBe(1)
    })

    it("should render select 4 ", ()=>{
        const component = shallow(<DashBoardCards goalCardList={[{start_at: start_at_1, deadline: deadline_1}, {start_at: start_at_2, deadline: deadline_2}]}/>)
        const wrapper = component.find(".DashBoardGoalCards Dropdown")
        const event = {data:{value:4}}
        const data = {value:4}
        wrapper.simulate("change", event, data)
        // expect(wrapper.length).toBe(1)
    })

});
