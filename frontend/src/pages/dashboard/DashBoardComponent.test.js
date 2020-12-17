import React from 'react'
import { Provider } from 'react-redux'
// import { Router, Route } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { getMockStore } from '../../test-utils/mocks'
import DashBoardComponent from './DashBoardComponent'
import { DashBoardPanel } from './DashBoardPanel/DashBoardPanel'
import DashBoardCards from './DashBoardCards/DashBoardCardsComponent'
// import history from '../../history'
import axios from 'axios'
// import { DashBoardPanel } from './DashBoardPanel/DashBoardPanelComponent';
import moment from 'moment'


const stubInitialState = {
    auth: "login",
    goal: {
        goals: [
        {
            'id': 1,
            'user': 1,
            'title': 'TITLE',
            'deadline': moment(new Date).add('1', 'day').startOf('day').unix(),
            'tags': ['tag1', 'tag2']
        }
    ]
}
}

const mockStore = getMockStore(stubInitialState)

describe('<DashboardComponent />', ()=> {


    it("should render without errors", ()=> {
        // const component = mount(WrappedDashBoard)
        const wrapper = shallow(<DashBoardComponent store={mockStore}/>)
        console.log("mount: ", wrapper.debug())
        wrapper.children().dive().find(".DashBoardPanel")
    })

    it("should handle corner cases when deadline is late", ()=> {

        // const component = mount(WrappedDashBoard)
        const wrapper = shallow(<DashBoardComponent store={mockStore}/>)
        console.log("mount: ", wrapper.debug())
        wrapper.children().dive().find(".DashBoardPanel")
    })

    afterEach(()=>{
        jest.clearAllMocks()
    })
})