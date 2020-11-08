import * as actionTypes from './types'
import axios from 'axios'
import {push} from 'connected-react-router'
import history from '../../history'
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
        username: user.get('username') // data type is FormData
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