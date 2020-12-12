import React from 'react'
import { shallow, mount } from 'enzyme';

import GeneralGoalInfo from './GeneralGoalInfo'

const mockSelectedGoal = {
    title: 'title',
    tags: ['tag1'],
    start_at: 1607756550,
    deadline: 1607766550
}

describe('GeneralGoalInfo ', () => {
    // beforeEach(() => {

    // })

    // afterEach(() => { jest.clearAllMocks() });

    it('should render without errors', () => {
        const component  = shallow(<GeneralGoalInfo selectedGoal={mockSelectedGoal} />)
        const wrapper = component.find(".GeneralGoalInfoPanel")
        expect(wrapper.length).toBe(1)
    })

    // it('should render without errors with nonzero number', () => {
    //     const component  = shallow(<AchInfo number={1} total={1} />)
    //     const wrapper = component.find(".AchInfo")
    //     expect(wrapper.length).toBe(1)
    // })
})