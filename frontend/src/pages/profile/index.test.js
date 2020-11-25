import { shallow, mount } from 'enzyme'
import Profile from './index';

describe('<EditProfileComponent />', ()=> {

    it("should render without errors", ()=> {
        const component = shallow(<Profile/>)
        const wrapper = component.find('.Profile')
        expect(wrapper.length).toBe(1)
    })
})