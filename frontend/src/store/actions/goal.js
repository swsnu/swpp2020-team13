import * as actionTypes from './types'
import axios from 'axios'
import history from '../../history'

export const getAllGoal_ = (goals) => {
    console.log("getAllGoal_ goals: ", goals)
    return { type: actionTypes.GET_ALL_GOAL, payload: goals }
}

export const getAllGoal = () => {
    return dispatch => {
        return axios.get('/api/v1/goals/')
        .then(res => dispatch(getAllGoal_(res.data)))
    }
}

export const getGoal_ = (goal) => {
    return { type: actionTypes.GET_GOAL, payload: goal }
}

export const getGoal = (id) => {
    return dispatch => {
        return axios.get('/api/v1/goals/' + id + '/')
        .then(res => {
            dispatch(getGoal_(res.data))
            // history.push('/edit')
        })
    }
}

export const addGoal_ = (goal) => {
    return {
        type: actionTypes.ADD_GOAL,
        payload: goal
    }
}

export const addGoal = (formData, file) => async dispatch => {
    const s3prefix = 'https://goalingball-test.s3.amazonaws.com/'
    console.log("[DEBUG] addGoal formData: ", formData)
    if (file) {
        const res = await axios.get('/api/v1/uploads/')
        console.log("[DEBUG] response.data in addGoal: ", res)

        const response = await axios.put(res.data.url, file, {
            headers: {
                'Content-Type': 'image/jpeg' 
            }
        })

        const imageUrl = s3prefix + res.data.key
        console.log("[DEBUG] imageUrl: ", imageUrl)
        formData.append('photo', imageUrl)
    } else {
        console.log("[DEBUG] no file found in addGoal")
    }

    const res = await axios.post('/api/v1/goals/', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    console.log("[DEBUG] res from server when adding goal: ", res.data)
    dispatch(addGoal_(res.data))
    history.push('/main')
}

export const editGoal = (id, data, file, key) => async dispatch => {
    
    console.log("[DEBUG] editGoal data: ", data)

    if (file) { // edit a photo or create a new one
        const s3prefix = 'https://goalingball-test.s3.amazonaws.com/'

        // no photo has been set yet
        if (!key) { 
            const res = await axios.get('/api/v1/uploads/')
            key = res.data.key
        }

        const res = await axios.put('/api/v1/uploads/', { key: key })

        const response = await axios.put(res.data.url, file, {
            headers: {
                'Content-Type': 'image/jpeg' 
            }
        })
        
        const imageUrl = s3prefix + res.data.key
        data['photo'] = imageUrl
        // console.log("changed photo: ", data['photo'])

    } else {
        if (key) {  // delete a photo
            // TODO
            // make another axios call
        }
    }

    console.log('Edit goal data: ', data)
    // const data = {
    //     title: formData.get('title'),
    //     photo: formData.get('photo'),
    //     deadline: formData.get('deadline'),
    //     tags: formData.get('tags')
    // }
    // const data_json = JSON.stringify(Object.fromEntries(formData))
    // console.log("data_json: ", data_json)
    
    // console.log("[DEBUG] edit goal data: ", datsa)

    const res = await axios.put(`/api/v1/goals/${id}/`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    
    dispatch(editGoal_(res.data))
    // console.log("pushed")
    history.push('/main')
}

export const editGoal_ = (goal) => {
    return {
        type: actionTypes.EDIT_GOAL,
        payload: goal,
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
        return axios.delete('/api/v1/goals/'+ id)
        .then(res => dispatch(deleteGoal_(id)))
    }
}



