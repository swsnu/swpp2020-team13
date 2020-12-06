import * as actionTypes from './types'
import axios from 'axios'
import history from '../../history'

export const get_achievements_of_task = task_id => async dispatch => {
     const res = await axios.get(`/api/v1/achievements/task/${task_id}/`)
     console.log("[DEBUG] get_achievements_of_task res.data: ", res.data)
     dispatch({
         type: actionTypes.GET_ACHIEVEMENTS_OF_TASK,
         payload: res.data
     })
}

export const get_achievements_of_goal = goal_id => async dispatch => {
    const res = await axios.get(`/api/v1/achievements/goal/${goal_id}/`)
    console.log("[DEBUG] get_achievements_of_goal res.data: ", res.data)
    dispatch({
        type: actionTypes.GET_ACHIEVEMENTS_OF_GOAL,
        payload: res.data
    })
}

export const add_achievement = (formValues, file) => async dispatch => {
    const s3prefix = 'https://goalingball-test.s3.amazonaws.com/'
    if (file) {
        const res = await axios.get('/api/v1/uploads/')
        const response = await axios.put(res.data.url, file, {
            headers: {
                'Content-Type': 'image/jpeg' 
            }
        })
        const imageUrl = s3prefix + res.data.key
        formValues.set('photo', imageUrl)
    } 

    const res = await axios.post('/api/v1/achievements/', formValues, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    dispatch({
        type: actionTypes.ADD_ACHIEVEMENT,
        payload: res.data
    })
    history.push('/main')
}

export const edit_achievement = (achievement_id, data, file, key) => async dispatch => {
    if (file) { // edit a photo or create a new one
        const s3prefix = 'https://goalingball-test.s3.amazonaws.com/'
        // no photo has been set yet
        if (!key) { 
            const res = await axios.get('/api/v1/uploads/')
            key = res.data.key
        }
        const res = await axios.put('/api/v1/uploads/', { key })

        await axios.put(res.data.url, file, {
            headers: {
                'Content-Type': 'image/jpeg' 
            }
        })
        
        const imageUrl = s3prefix + res.data.key
        data['photo'] = imageUrl
    } 
    else {
        if (key) {  // delete a photo
            // TODO
            // make another axios call
        }
    }
    // else: no editing or creating a photo
    
    const res = await axios.put(`/api/v1/achievements/${achievement_id}/`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    console.log('edit achievement res.data: ', res.data)
    dispatch({
        type: actionTypes.EDIT_ACHIEVEMENT,
        payload: res.data
    })
    dispatch({
        type: actionTypes.EDIT_TASK_OF_ACHIEVEMENT,
        payload: res.data
    })
    history.push('/main')
}

// Is it allowed to delete an existing achievement?
export const delete_achievement = achievement_id => async dispatch => {
    const res = await axios.delete(`/api/v1/achievements/${achievement_id}/`)
    if (res.status == 200) {
        dispatch({
            type: actionTypes.DELETE_ACHIEVEMENT,
            payload: achievement_id
        })
        // TODO: DELETE_ACHIEVEMENT_FROM_TASK
    }
    else {
        console.log("Fail to delete an achievement with id ", achievement_id)
    }
}