import React from 'react'
import { shallow, mount } from 'enzyme';
import AccSegment from './AccSegmentComponent';

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
        id: 1
    }

    it('should render without errors', ()=>{
        const component  = shallow(<AccSegment task={mockTask}/>)
        const wrapper = component.find(".AccContainer")
        expect(wrapper.length).toBe(1)
    })

    it('should handle onclick in editing achievements', ()=>{
        const component  = shallow(<AccSegment task={mockTask}/>)
        const wrapper = component.find(".AccContainer #EditAchButton")
        wrapper.simulate("click")
    })

    it('should pass onSubmit to AddAcc', ()=>{
        const component  = mount(<AccSegment task={mockTask}/>)
        const wrapper = component.find(".AccContainer #EditAchButton button" )
        // console.log(component.debug())
        wrapper.simulate("click")
        const wrapper_add = component.find(".AddAccForm .AddAccCloseButton button")
        expect(wrapper_add.length).toBe(1)
        wrapper_add.simulate("click")
    })

});
