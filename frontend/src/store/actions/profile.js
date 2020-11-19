import * as ActionTypes from "./types"
import axios from 'axios'

export const getProfile_ = (profile) => {
    return { type: actionTypes.GET_PROFILE, profile: profile }
}

export const getProfile = () => {
    // return dispatch => {
    //     return axios.get('/api/v1/profile/')
    //     .then(res => dispatch(getProfile_(res.data)))
    // }
}

export const editProfile_ = (profile) => {
    return {
        type: actionTypes.EDIT_PROFILE,
        photo: profile.photo,
        name: profile.name,
        bio: profile.bio,
        tags: profile.tags
    }
}

export const editProfile = (profile) => {
    // return (dispatch) => {
    //     return axios.put('/api/v1/profile/')
    //     .then(res => dispatch(editProfile_(profile)))
    // }
}