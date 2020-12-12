import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { shallow, mount } from 'enzyme';

import { TaskInfo } from './TaskInfo'

let mockProps = {
    task: {
        id: 1,
        title: 'title',
        importance: 3,
        day_of_week: ['MONDAY'],
        start_at: 1607756550,
        deadline: 1607766550
    },
    onSelect: jest.fn(),
}

let mockStore = createStore(() => {})

describe('TaskInfo ', () => {
    let WrappedTaskInfo
    // beforeEach(() => {
    //     WrappedTaskInfo = (
    //         <Provider store={mockStore}>
    //             <TaskInfo {...mockProps} />
    //         </Provider>
    //     )
    // })

    afterEach(() => { jest.clearAllMocks() });

    it('should render without errors', () => {
        const component  = shallow(<TaskInfo {...mockProps} />).dive()
        // const component  = shallow(WrappedTaskInfo).dive()
        console.log("component: ", component.debug())
        const wrapper = component.find(".TaskInfo")
        console.log("wrapper: ", wrapper.debug())
        expect(wrapper.length).toBe(1)
    })

    it('should render without errors when day_of_week is empty', () => {
        mockProps.task.day_of_week = []
        const component  = shallow(<TaskInfo {...mockProps} />).dive()
        console.log("component: ", component.debug())
        const wrapper = component.find(".TaskInfo")
        console.log("wrapper: ", wrapper.debug())
        expect(wrapper.length).toBe(1)
    })
})