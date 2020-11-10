import * as ActionTypes from '../actions/types'

const initialState = {
    auth: false,
    addTask: false
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CLOSE_MODAL:
            return { auth: false }
        case ActionTypes.OPEN_AUTH_MODAL:
            return { auth: true }
        case ActionTypes.OPEN_ADD_TASK_MODAL:
            return {addTask: true}
        case ActionTypes.CLOSE_ADD_TASK_MODAL:
            return {addTask: false}
        default:
            return state
    }
}

export default modalReducer