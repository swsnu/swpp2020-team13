import { combineReducers } from 'redux'
import authReducer from './authReducer'
import goalReducer from './goalReducer'
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import {history} from '../../history'

const rootReducer = combineReducers({
    go: goalReducer,
    auth: authReducer,
    router: connectRouter(history)
})

export default rootReducer