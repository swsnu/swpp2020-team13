import * as ActionTypes from "./types"

export const closeModal = () => {
    return {
        type: ActionTypes.CLOSE_MODAL,
        payload: null
    }
}

export const openAuthModal = () => {
    return {
        type: ActionTypes.OPEN_AUTH_MODAL,
        payload: null
    }
}