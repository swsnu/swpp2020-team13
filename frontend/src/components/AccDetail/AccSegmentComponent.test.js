import React from 'react'
import { Router} from 'react-router-dom';
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import AccSegmentComponent from './AccSegmentComponent'
import { getMockStore } from '../../test-utils/mocks'
import history from '../../history'
import chai, { expect } from 'chai'

describe('<AccSegmentComponent />', () => {

    const mockTask = {
        title: "TEST TASK",
        importance: 5,
    }
  
    it("should render without errors", ()=> {
        const component = mount(<AccSegmentComponent task={mockTask}/>)
        const wrapper = component.find('.AccContainer')
        // console.log(component.debug())
        expect(wrapper.length).eql(2)
    })

    it("should call onClickAddAccHandler", ()=> {
        const component = mount(<AccSegmentComponent task={mockTask}/>)
        const button = component.find('.EditDescription')
        button.at(0).simulate('click');
        const wrapper = component.find('AddAccForm')
        expect(wrapper.length).eql(1)
    })
})
