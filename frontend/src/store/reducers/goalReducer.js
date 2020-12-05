import * as actionTypes from '../actions/types'

const initialState = {
    goals: [
    ],
    selectedGoal: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_GOAL:
            return {...state, goals: action.payload}

        case actionTypes.GET_GOAL:
            return {...state, selectedGoal: action.payload}

        case actionTypes.ADD_GOAL:
            const newGoal = action.payload
            return {...state, goals: [...state.goals, newGoal]}

        case actionTypes.EDIT_GOAL:
            // remove the old item and add the new item
            let filteredGoals = state.goals.filter(g => g.id !== action.payload.id).append(action.payload)
            return {...state, selectedGoal: action.payload, goals: filteredGoals}
            /*
            const modifiedGoalList = state.goals.map((g)=> {
                if(g.id == action.id) {
                    return {...g, title: action.title, photo: action.photo, deadline: action.deadline, tags: action.tags}
                } else {
                    return g
                }
            })
            state.goals = modifiedGoalList
            const modified = modifiedGoalList.find(g=>g.id==action.id)
            return {...state, selectedGoal: modified}
            */

        case actionTypes.DELETE_GOAL:
            // g.id and action.id should be both integer (the same type)
            const deleted = state.goals.filter(g => g.id !== action.id)
            return {...state, goals: deleted}

        case actionTypes.ADD_TASK_TO_GOAL:
            const target = state.goals.filter(goal => goal.id == action.payload.goal)[0]
            const rest = state.goals.filter(goal => goal.id != action.payload.goal)
            return { ...state, goals: [...rest, {...target, tasks: [...target.tasks, action.payload]}]}

        case actionTypes.DELETE_TASK_TO_GOAL:
            const target_delete = state.goals.filter(goal => goal.id === action.payload.goal_id)[0]
            const target_deleted_task = target_delete.tasks.filter(t => t.id !== action.payload.task_id)
            const updated_goal = {...target_delete, tasks: target_deleted_task}
            const rest_delete = state.goals.filter(goal => goal.id !== action.payload.goal_id)
            return { ...state, goals: [...rest_delete, updated_goal], selectedGoal: updated_goal}

        default:
            break
    }
    return state
}

export default reducer