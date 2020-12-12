import React from 'react'
import { shallow, mount } from 'enzyme';

import { AchInfo } from './AchInfo'

const mockProps = {
    number: 0,
    total: 0
}

describe('AchInfo ', () => {
    // beforeEach(() => {

    // })

    // afterEach(() => { jest.clearAllMocks() });

    it('should render without errors', () => {
        const component  = shallow(<AchInfo number={0} total={0} />)
        const wrapper = component.find(".AchInfo")
        expect(wrapper.length).toBe(1)
    })

    it('should render without errors with nonzero number', () => {
        const component  = shallow(<AchInfo number={1} total={1} />)
        const wrapper = component.find(".AchInfo")
        expect(wrapper.length).toBe(1)
    })
})