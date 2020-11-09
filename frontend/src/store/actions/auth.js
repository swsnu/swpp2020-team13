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

export const loginUser = (dataForm) => async (dispatch) => {
    console.log("[DEBUG] data to loginUser: ", dataForm)
    const res = await axios.post('/api/v1/users/login/', dataForm, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    console.log("[DEBUG] res in loginUser: ", res)
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
//         .then((res) => {
//             console.log("[DEBUG] res.data in loginUser: ", res.data)
//             dispatch(loginUser_(res.data))
//         })
//         // .then((res) => dispatch(loginUser_(res.data)))
//         .then(()=>{history.push('/main')})
//     }
// }

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