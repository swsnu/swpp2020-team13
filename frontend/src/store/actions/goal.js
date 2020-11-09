import * as actionTypes from './types'
import axios from 'axios'

export const getAllGoal_ = (goals) => {
    return { type: actionTypes.GET_ALL_GOAL, goals: goals }
}

export const getAllGoal = () => {
    return dispatch => {
        return axios.get('/api/v1/goals/')
        .then(res => dispatch(getAllGoal_(res.data)))
    }
}

export const getGoal_ = (goal) => {
    return { type: actionTypes.GET_GOAL, target: goal }
}

export const getGoal = (id) => {
    return dispatch => {
        return axios.get('/api/v1/goals/' + id + '/')
        .then(res => {
            dispatch(getGoal_(res.data))
        })
    }
}

export const addGoal_ = (goal) => {
    return {
        type: actionTypes.ADD_GOAL,
        title: goal.title,
        photo: goal.photo ? goal.photo : null, 
        deadline: goal.deadline ? goal.deadline : null,
        tags: goal.tags ? goal.tags : null
    }
}

export const addGoal = (formData, file) => async dispatch => {
    const s3prefix = 'https://goalingball-test.s3.amazonaws.com/'
    console.log("[DEBUG] addGoal formData: ", formData)
    if (file) {
        const res = await axios.get('/api/v1/uploads/')
        console.log("[DEBUG] response.data in addGoal: ", res.data)

        const response = await axios.put(res.data.url, file, {
            headers: {
                'Content-Type': 'image/jpeg' 
            }
        })

        const imageUrl = s3prefix + res.data.key
        console.log("[DEBUG] imageUrl: ", imageUrl)

        formData['photo'] = imageUrl
    } else {
        console.log("[DEBUG] no file found in addGoal")
    }

    const res = await axios.post('/api/v1/goals/', formData)
    console.log("[DEBUG] res from server when adding goal: ", res.data)
    dispatch(addGoal_(res.data))
}

export const deleteGoal_ = (id) => {
    return {
        type: actionTypes.DELETE_GOAL,
        id: id
    }
}

export const deleteGoal = (id) => {
    return dispatch => {
        return axios.delete('/api/v1/goals/'+ id)
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
        return axios.put('/api/v1/goals/'+ goal.id + '/', goal)
        .then(res => dispatch(editGoal_(goal)))
    }
}