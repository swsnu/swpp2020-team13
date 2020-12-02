import * as actionTypes from './types'
import axios from 'axios'

export const explore_getAllGoal_ = (goals) => {
    console.log("explore_getAllGoal_ goals: ", goals)
    return { type: actionTypes.EXPLORE_GET_ALL_GOAL, goals: goals.slice(1, goals.length) } // remove ML status info from response
}

export const explore_getAllGoal = () => {
    return dispatch => {
        return axios.get('/api/v1/explore/recommend/')
        .then(res => dispatch(explore_getAllGoal_(res.data)))
    }
}

export const explore_getGoal_ = (goal) => {
    return { type: actionTypes.EXPLORE_GET_GOAL, target: goal }
}

export const explore_getGoal = (id) => {
    return dispatch => {
        return axios.get('/api/v1/explore/recommend/' + id + '/')
        .then(res => {
            dispatch(explore_getGoal_(res.data))
        })
    }
}

export const explore_get_ach_by_goal = (id) => {
    return dispatch => {
        return axios.get('/api/v1/explore/recommend/ach/' + id + '/')
        .then(res => {
            dispatch(explore_get_ach_by_goal_(res.data))
        })
    }
}

export const explore_get_ach_by_goal_ = (achievements) => {
    return { type: actionTypes.EXPLORE_GET_ACH_BY_GOAL, achievements: achievements }
}