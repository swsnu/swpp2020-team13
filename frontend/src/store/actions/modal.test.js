import * as actionCreatorsModal from './modal'
import store from '../store'
import { getMockStore } from '../../test-utils/mocks'

const stubInitialState = {
    auth: true,
    authModal: false,
    addTask: false,
}
const mockStore = getMockStore(stubInitialState);

describe("Action modal.js", () => {

    it('should close modal', async () => {
        await mockStore.dispatch(actionCreatorsModal.closeModal())
    })

    it('should close AddTaskmodal', async () => {
        await mockStore.dispatch(actionCreatorsModal.closeAddTaskModal())
    })

})