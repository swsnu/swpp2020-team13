import * as actionTypes from '../actions/types'

const initialState = {
    tasks: [
    ],
    selectedTask: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_TASK:
            return {...state, tasks: action.payload}
        case actionTypes.ADD_TASK:
            const newTask = action.payload
            return {...state, tasks: [...state.tasks, newTask]}
        case actionTypes.DELETE_TASK:
            const deleted = state.tasks.filter(t => t.id !== action.payload)
            return {...state, tasks: deleted}
        case actionTypes.EDIT_TASK:
            // TODO
            return state
        default:
            break
    }
    return state
}

export default reducer