import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'

import rootReducer from './reducers'

const composeEnhanders = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, {}, composeEnhanders(applyMiddleware(reduxThunk)))

export default store
// export * from './reducers'