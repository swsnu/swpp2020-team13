import * as actionTypes from './types'
import axios from 'axios'

export const signupUser_ = (user) => {
    return {
        type: actionTypes.SIGNUP_USER,
        id: user.id,
        username: user.username,
        password: user.password,
    }
}

export const signupUser = (user) => {
    return (dispatch) => {
        return axios.post('/api/v1/users/signup/', user, {
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
        username: user.username,
    }
}

export const loginUser = (user) => {
    return (dispatch) => {
        return axios.post('/api/v1/users/login/', user, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then((res) => dispatch(loginUser_(user)))
    }
}

export const logoutUser_ = (user) => {
    return {
        type: actionTypes.LOGOUT_USER
    }
}

export const logoutUser = (user) => {
    return (dispatch) => {
        return axios.post('/api/v1/users/logout/', user, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then((res) => dispatch(logoutUser_(user)))
    }
}