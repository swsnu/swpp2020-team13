import React from 'react'
import { Router} from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import moment from 'moment'
import TaskAndAchTotal from './TaskAndAchTotal';

describe('TaskAndAchTotal', () => {

    let mockTasks =
    [
        {title: "title1", id:1, deadline: (moment(new Date).startOf('day').unix() + 24*60*60), start_at : moment(new Date).startOf('day').unix(), day_of_week:["MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SUNDAY"] },
        {title: "title2", id:2, deadline:"2020-12-31", day_of_week:[""] }
    ]
    let mockAch = [{written_at : (moment(new Date).startOf('day').unix() + 24*60*60), des: "des", id: 1, photo: "goalingball.com", task: 1}, 
                 {written_at : (moment(new Date).startOf('day').unix() + 24*60*60), des: "des", id: 2, photo: "goalingball.com", task: 1}
                    ]

    it("should render", ()=>{
        const component = shallow(<TaskAndAchTotal tasks={mockTasks} achievements={[]}/>)
        const wrapper = component.find(".TaskAndAchContainer")
        expect(wrapper.length).toBe(1)
    })

    it("should render next ach", ()=>{
        const component = shallow(<TaskAndAchTotal tasks={mockTasks} achievements={mockAch}/>)
        component.setState({selectedTask: 1})
        console.log(component.debug())
        const wrapper = component.find(".DashNextAch")
        wrapper.simulate("click")
        const wrapper_prev = component.find(".DashPrevAch")
        wrapper_prev.simulate("click")
    })

    it("should render with no tasks", ()=>{
        const component = shallow(<TaskAndAchTotal tasks={[]} achievements={[]}/>)
        const wrapper = component.find(".TaskAndAchContainer")
        expect(wrapper.length).toBe(1)
    })
});
