import * as actionTypes from '../actions/types'

export default function(state = null, action) {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return action.payload  // user_id or user_info
    case actionTypes.LOGOUT_USER:
      return null
    default:
      return state
  }
}