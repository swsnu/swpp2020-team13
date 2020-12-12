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

    it('should render many tags', () => {
        const mockGoal2= {
            id: 1,
            title: 'title',
            username: 'username',
            photo: null,
            tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5']
        }
        const component  = shallow(<RecCard goal={mockGoal2} />)
        const wrapper = component.find(".RecCardComp")
        expect(wrapper.length).toBe(1)
    })
})