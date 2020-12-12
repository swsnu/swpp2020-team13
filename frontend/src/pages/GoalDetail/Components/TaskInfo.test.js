import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { shallow, mount } from 'enzyme';

import { TaskInfo } from './TaskInfo'

const mockProps = {
    task: {
        id: 1,
        title: 'title',
        importance: 3,
        day_of_week: [],
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
})