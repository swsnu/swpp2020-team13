import * as actionTypes from './types'
import axios from 'axios'
import {push} from 'connected-react-router'
import history from '../../history'

export const signupUser_ = (user) => {
    return {
        type: actionTypes.SIGNUP_USER,
        payload: {
            id: user.id,
            username: user.username,
        }
    }
}

export const signupUser = (data) => {
    return (dispatch) => {
        return axios.post('/api/v1/users/signup/', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then((res) => dispatch(signupUser_(res.data)))
    }
}

export const loginUser_ = (user) => {
    return {
        type: actionTypes.LOGIN_USER,
        payload: {
            id: user.id,
            username: user.username,
        }
    }
}

export const loginUser = (data) => {
    return (dispatch) => {
        return axios.post('/api/v1/users/login/', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then((res) => dispatch(loginUser_(res.data)))
        .then(()=>{history.push('/main')})
    }
}

export const logoutUser_ = () => {
    return {
        type: actionTypes.LOGOUT_USER
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        return axios.post('/api/v1/users/logout/')
        .then((res) => dispatch(logoutUser_()))
    }
}