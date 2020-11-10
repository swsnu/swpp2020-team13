import * as actionTypes from '../actions/types'

/*
state: {
  id: number
  username: string
}
*/

export default function(state = null, action) {
  switch (action.type) {
    case actionTypes.SIGNUP_USER:
      return action.payload

    case actionTypes.LOGIN_USER:
      return action.payload

    case actionTypes.LOGOUT_USER:
      return null
      
    default:
      return state
  }
}