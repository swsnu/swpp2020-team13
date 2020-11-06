import * as actionTypes from '../actions/types'

const initialState = {
  loginUser: null
}

export default function(state = null, action) {
  switch (action.type) {
    case actionTypes.SIGNUP_USER:
      const newUser = {
        id: action.id,
        username: action.username
      }
      return {...state, loginUser: newUser}
    case actionTypes.LOGIN_USER:
      return action.payload  // user_id or user_info
    case actionTypes.LOGOUT_USER:
      return null
    default:
      return state
  }
}