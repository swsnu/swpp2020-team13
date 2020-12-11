import React from 'react'
import { shallow, mount } from 'enzyme';
import AccSegment from './AccSegmentComponent';
import moment from 'moment'
// jest.mock('../AddAcc/AddAccForm', ()=>{
//     return jest.fn(props => {
//         return (
//             <div className="mockAdd">
//                 <button onclick={()=>props.onSubmit(false)}></button>
//             </div>
//         )
//     })
// })

describe('AccSegment', () => {

    let mockTask = {
        title:"title",
        day_of_week: ["Tuesday"],
        id: 1,
        achievements: []
    }

    it('should render without errors', ()=>{
        const component  = shallow(<AccSegment task={mockTask} achievements={[]}/>)
        const wrapper = component.find(".AccContainer")
        expect(wrapper.length).toBe(0)
    })

    it('should handle onclick in editing achievements', ()=>{
        const today  = new Date
        const today_ts = moment(today).startOf('day').unix() + (24*60*60) - 1
        const component  = shallow(<AccSegment task={mockTask} achievements={[{written_at: today_ts, task: 1}]} today={today}/>)
        // console.log(component.debug())
        const wrapper = component.find(".AccContainer #EditAchButton")
        wrapper.simulate("click")
    })


});
