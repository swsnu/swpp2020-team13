import * as actionTypes from '../actions/types'

const initialState = {
    tasks: [
    ],
    selectedTask: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_TASK:
            return {...state, tasks: action.tasks}
        case actionTypes.ADD_TASK:
            const newTask = {
                id: action.id,
                goal_id: action.goal_id,
                title: action.title,
                deadline: action.deadline,
                importance: action.importance,
                day_of_week: action.day_of_week,
            }
            return {...state, tasks: [...state.tasks, newTask]}
        case actionTypes.DELETE_TASK:
            const deleted = state.tasks.filter((t)=>{
                return t.id != action.id
            })
            return {...state, tasks: deleted}
        default:
            break
    }
    return state
}

export default reducer