import * as actionTypes from '../actionTypes'
import axios from 'axios'

export const getAllGoal_ = (goals) => {
    return { type: actionTypes.GET_ALL_GOAL, goals: goals }
}

export const getAllGoal = () => {
    return dispatch => {
        return axios.get('/api/v1/goal/')
        .then(res => dispatch(getAllGoal_(res.data)))
    }
}

export const getGoal_ = (goal) => {
    return { type: actionTypes.GET_GOAL, target: goal }
}

export const getGoal = (id) => {
    return dispatch => {
        return axios.get('/api/v1/goal/' + id + '/')
        .then(res => {
            dispatch(getGoal_(res.data))
        })
    }
}

export const addGoal_ = (goal) => {
    return {
        type: actionTypes.ADD_GOAL,
        title: goal.title,
        photo: goal.photo, 
        deadline: goal.deadline,
        tags: goal.tags
    }
}

export const addGoal = (goal) => {
    return (dispatch) => {
        return axios.post('/api/v1/goal/', goal)
        .then(res=> dispatch(addGoal_(res.data)))
    }
}

export const deleteGoal_ = (id) => {
    return {
        type: actionTypes.DELETE_GOAL,
        id: id
    }
}

export const deleteGoal = (id) => {
    return dispatch => {
        return axios.delete('/api/v1/goal/'+ id)
        .then(res => dispatch(deleteGoal_(id)))
    }
}

export const editGoal_ = (goal) => {
    return {
        type: actionTypes.EDIT_GOAL,
        title: goal.title,
        photo: goal.photo, 
        deadline: goal.deadline,
        tags: goal.tags
    }
}

export const editGoal = (goal) => {
    return (dispatch) => {
        return axios.put('/api/v1/goal/'+ goal.id + '/', goal)
        .then(res => dispatch(editGoal_(goal)))
    }
}