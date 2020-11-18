import * as ActionTypes from '../actions/types'

const initialState = {
    authModal: false,
    addTask: false
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CLOSE_MODAL:
            return { authModal: false }
        case ActionTypes.OPEN_AUTH_MODAL:
            return { authModal: true }
        case ActionTypes.OPEN_ADD_TASK_MODAL:
            return {addTask: true}
        case ActionTypes.CLOSE_ADD_TASK_MODAL:
            return {addTask: false}
        default:
            return state
    }
}

export default modalReducer