import * as actionTypes from '../actions/types'

/*
state: {
  loginUser: {
    id: number
    username: string
  }
}
*/

export default function(state = null, action) {
  switch (action.type) {
    case actionTypes.SIGNUP_USER:
      return {...state, loginUser: action.payload }

    case actionTypes.LOGIN_USER:
      return {...state, loginUser: action.payload}

    case actionTypes.LOGOUT_USER:
      return {...state, loginUser: null}
      
    default:
      return state
  }
}