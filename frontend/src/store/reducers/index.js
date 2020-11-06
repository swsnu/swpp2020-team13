import { combineReducers } from 'redux'
import authReducer from './authReducer'
<<<<<<< HEAD
import goalReducer from './goalReducer'
import { connectRouter } from 'connected-react-router'
import {history} from '../../history'
=======
import modalReducer from './modalReducer'
>>>>>>> 4825fd4bb2eeebd46c0525398a9464c1c7bc3468

const rootReducer = combineReducers({
  auth: authReducer,
<<<<<<< HEAD
  goal: goalReducer,
  router: connectRouter(history)
})

export default rootReducer
=======
  modal: modalReducer
})
>>>>>>> 4825fd4bb2eeebd46c0525398a9464c1c7bc3468
