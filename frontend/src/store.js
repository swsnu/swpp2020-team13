import goalReducer from './store/reducers/goalReducer'
import authReducer from './store/reducers/authReducer'
import rootReducer from './store/reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';                                           
import { connectRouter, routerMiddleware } from 'connected-react-router';
import {history} from './history'
const logger = store => {
    return next => {
        return action => {
            console.log("[Middleware] Dispatching", action)
            const result = next(action)
            console.log("[Middleware] Next State", store.getState())
            return result
        }
    }
}
export const middlewares = [logger, thunk, routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, 
    composeEnhancers(applyMiddleware(...middlewares)))

export default store