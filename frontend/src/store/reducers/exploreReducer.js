import * as actionTypes from '../actions/types'

const initialState = {
    // exploreStatus: null,
    goals: [],
    selectedGoal: null,
    achievements:[]
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.EXPLORE_GET_ALL_GOAL:
            return {...state, goals: action.goals}
        case actionTypes.EXPLORE_GET_GOAL:
            return {...state, selectedGoal: action.target}
        case actionTypes.EXPLORE_GET_ACH_BY_GOAL:
            return {...state, achievements: action.achievements}
        default:
            break
    }
    return state
}

export default reducer