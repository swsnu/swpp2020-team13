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
        case actionTypes.EDIT_TASK: {
            const filtered = state.tasks.filter(task => task.id !== action.payload.id)
            return { ...state, tasks: [...filtered, action.payload]}
        }
        case actionTypes.EDIT_TASK_OF_ACHIEVEMENT: {
            const filtered = state.tasks.filter(task => task.id !== action.payload.task)
            const target = state.tasks.filter(task => task.id === action.payload.task)[0]
            target.achievements.filter(achv => achv.id !== action.payload.id)
            target.achievements.append(action.payload)
            return { ...state, tasks: [...filtered, target]}
        }
        default:
            break
    }
    return state
}

export default reducer