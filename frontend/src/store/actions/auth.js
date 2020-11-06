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