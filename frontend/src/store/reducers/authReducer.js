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
      const user = {
        username: action.username
      }
      console.log("change loginuser state")
      return {...state, loginUser: user}
      // return action.payload  // user_id or user_info
    case actionTypes.LOGOUT_USER:
      return {...state, loginUser: null}
    default:
      return state
  }
}