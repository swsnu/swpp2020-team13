import React from 'react'
import { shallow, mount } from 'enzyme';

import RecCard from './RecCard'

const mockGoal= {
    id: 1,
    title: 'title',
    username: 'username',
    photo: null,
    tags: ['tag1']
}

describe('RecCard ', () => {
    // beforeEach(() => {

    // })

    // afterEach(() => { jest.clearAllMocks() });

    it('should render without errors', () => {
        const component  = shallow(<RecCard goal={mockGoal} />)
        const wrapper = component.find(".RecCardComp")
        expect(wrapper.length).toBe(1)
    })
})