import * as actionTypes from './types'
import axios from 'axios'
import history from '../../history'

export const get_achievements_of_task = task_id => async dispatch => {
     const res = await axios.get(`/api/v1/achievements/tasks/${task_id}/`)
     console.log("[DEBUG] get_achievements_of_task res.data: ", res.data)
     dispatch({
         type: actionTypes.GET_ACHIEVEMENTS_OF_TASK,
         payload: res.data
     })
}

export const get_achievements_of_goal = goal_id => async dispatch => {
    const res = await axios.get(`/api/v1/achievements/goals/${goal_id}/`)
    console.log("[DEBUG] get_achievements_of_goal res.data: ", res.data)
    dispatch({
        type: actionTypes.GET_ACHIEVEMENTS_OF_GOAL,
        payload: res.data
    })
}

export const add_achievement = formValues => async dispatch => {
    // TODO: add logic for uploading a photo
    const res = await axios.post('/api/v1/achievements/', formValues)
    dispatch({
        type: actionTypes.ADD_ACHIEVEMENT,
        payload: res.data
    })
}

export const edit_achievement = (achievement_id, data) => async dispatch => {
    // TODO: add logic for uploading a photo
    const res = await axios.put(`/api/v1/achievements/${achievement_id}/`, data)
    dispatch({
        type: actionTypes.EDIT_ACHIEVEMENT,
        payload: res.data
    })
}

export const delete_achievement = achievement_id => async dispatch => {
    const res = await axios.delete(`/api/v1/achievements/${achievement_id}/`)
    if (res.status == 200) {
        dispatch({
            type: actionTypes.DELETE_ACHIEVEMENT,
            payload: achievement_id
        })
    }
    else {
        console.log("Fail to delete an achievement with id ", achievement_id)
    }
}