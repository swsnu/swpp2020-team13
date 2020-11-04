import { LOGIN_USER, LOGOUT_USER } from '../actions/actionTypes'

export default function(state = null, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload  // user_id or user_info
    case LOGOUT_USER:
      return null
    default:
      return state
  }
}