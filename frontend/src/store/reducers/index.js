import { combineReducers } from 'redux'
import authReducer from './authReducer'
import goalReducer from './goalReducer'
import { connectRouter } from 'connected-react-router'
import {history} from '../../history'

const rootReducer = combineReducers({
  auth: authReducer,
  goal: goalReducer,
  router: connectRouter(history)
})

export default rootReducer