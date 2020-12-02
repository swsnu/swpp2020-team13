import { combineReducers } from 'redux'
import authReducer from './authReducer'
import goalReducer from './goalReducer'
import taskReducer from './taskReducer'
import achievementReducer from './achievementReducer'
import { connectRouter } from 'connected-react-router'
import history from '../../history'
import modalReducer from './modalReducer'
import exploreReducer from './exploreReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  goal: goalReducer,
  task: taskReducer,
  achievement: achievementReducer,
  modal: modalReducer,
  explore: exploreReducer,
  router: connectRouter(history)
})

export default rootReducer
