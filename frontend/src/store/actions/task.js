import * as actionTypes from './types'
import axios from 'axios'
import history from '../../history'

export const getAllTask_ = (tasks) => {
    return { type: actionTypes.GET_ALL_TASK, tasks: tasks }
}

export const getAllTask = () => {
    return dispatch => {
        return axios.get('/api/v1/tasks/')
        .then(res => dispatch(getAllTask_(res.data)))
    }
}

export const addTask_ = (task) => {
    return {
        // type: actionTypes.ADD_GOAL,
        // title: goal.title,
        // photo: goal.photo ? goal.photo : null, 
        // created_at: goal.created_at ? goal.created_at : null,
        // deadline: goal.deadline ? goal.deadline : null,
        // tags: goal.tags ? goal.tags : null
        type: actionTypes.ADD_TASK,
        id: task.id,
        goal_id: task.goal_id,
        title: task.title,
        deadline: task.deadline,
        importance: task.importance,
        day_of_week: task.day_of_week,
    }
}

export const addTask = (formData, file) => async dispatch => {
    const res = await axios.post('/api/v1/tasks/', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    dispatch(addTask_(res.data))
    history.push('/main')
}

export const deleteTask_ = (id) => {
    return {
        type: actionTypes.DELETE_TASK,
        id: id
    }
}

export const deleteTask = (id) => {
    return dispatch => {
        return axios.delete('/api/v1/tasks/'+ id)
        .then(res => dispatch(deleteTask_(id)))
    }
}
