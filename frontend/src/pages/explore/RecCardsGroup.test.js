import React from 'react'
import { Router} from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { RecCardsGroup } from './RecCardsGroup';
import moment from 'moment'

describe('RecCardsGroup', () => {

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
    it("should render", ()=>{
        const component = shallow(<RecCardsGroup goals={[mockGoalDefault]}/>)
        const wrapper = component.find(".RecGoalCards")
        expect(wrapper.length).toBe(1)
    })
    it('should show more when clicked', ()=>{
        const component = shallow(<RecCardsGroup goals={[mockGoalDefault]}/>)
        const wrapper = component.find(".ExpShowMore")
        wrapper.simulate("click")
    })
    it('should show less when clicked', ()=>{
        const component = shallow(<RecCardsGroup goals={[mockGoalDefault]}/>)
        const wrapper = component.find(".ExpShowMore")
        wrapper.simulate("click")
        const wrapper_less = component.find(".ExpShowLess")
        wrapper_less.simulate("click")
    })
});
