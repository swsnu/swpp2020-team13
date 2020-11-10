import * as ActionTypes from '../actions/types'

const initialState = {
    auth: false
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CLOSE_MODAL:
            return { auth: false }
        case ActionTypes.OPEN_AUTH_MODAL:
            return { auth: true }
        default:
            return state
    }
}

export default modalReducer