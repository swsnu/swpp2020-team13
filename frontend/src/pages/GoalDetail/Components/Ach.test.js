import React from 'react'
import { shallow, mount } from 'enzyme';

import { Ach } from './Ach'

const mockAchv = {
    percentage_complete: 100.0,
    written_at: 1607756550,
    photo: null,
    description: "description"
}

describe('Ach ', () => {
    // beforeEach(() => {

    // })

    // afterEach(() => { jest.clearAllMocks() });

    it('should render without errors', () => {
        const component  = shallow(<Ach achievement={mockAchv} />)
        const wrapper = component.find(".AccContainer")
        expect(wrapper.length).toBe(1)
    })
})