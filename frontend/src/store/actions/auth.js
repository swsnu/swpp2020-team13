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
    console.log("[DEBUG] loginUser action. user: ", user)
    return {
        type: actionTypes.LOGIN_USER,
        payload: {
            id: user.id,
            username: user.username,
        }
    }
}

export const loginUser = (data) => async (dispatch) => {
    // console.log("[DEBUG] data to loginUser: ", data)
    const res   = await axios.post('/api/v1/users/login/', data)
    // console.log("[DEBUG] res in loginUser: ", res)
    dispatch(loginUser_(res.data))
    history.push('/main')
}

// export const loginUser = (data) => {
//     return (dispatch) => {
//         console.log("[DEBUG] data to loginUser: ", data)
//         return axios.post('/api/v1/users/login/', data, {
//             headers: {
//                 "Content-Type": "multipart/form-data"
//             }
//         })
//         .then((res) => {dispatch(loginUser_(res.data))

//         // .then((res) => dispatch(loginUser_(res.data)))
//         .then(()=>{history.push('/main')})
//     }
// }


export const logoutUser = () => {
    axios.post('/api/v1/users/logout/')
    return { 
        type: actionTypes.LOGOUT_USER,
        payload: null
    }
}

export const session = () => async dispatch => {
    const res = await axios.post('/api/v1/users/session/')
    if (res.data) {
        console.log("session res.data: ", res.data)
        dispatch({
            type: actionTypes.LOGIN_USER,
            payload: res.data
        })
    }
}