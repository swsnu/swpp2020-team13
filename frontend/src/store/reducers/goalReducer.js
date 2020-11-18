import * as actionTypes from '../actions/types'

const initialState = {
    goals: [
    ],
    selectedGoal: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_GOAL:
            return {...state, goals: action.goals}

        case actionTypes.GET_GOAL:
            return {...state, selectedGoal: action.target}

        case actionTypes.ADD_GOAL:
            const newGoal = action.payload
            return {...state, goals: [...state.goals, newGoal]}

        case actionTypes.EDIT_GOAL:
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

        case actionTypes.DELETE_GOAL:
            const deleted = state.goals.filter((g)=>{
                return g.id != action.id
            })
            return {...state, goals: deleted}

        case actionTypes.ADD_TASK_TO_GOAL:
            const target = state.goals.filter(goal => goal.id == action.payload.goal)[0]
            const rest = state.goals.filter(goal => goal.id != action.payload.goal)

            return { ...state, goals: [...rest, {...target, tasks: [...target.tasks, action.payload]}]}

        default:
            break
    }
    return state
}

export default reducer