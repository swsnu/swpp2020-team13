import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';                                           
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import history from '../history'
import {middlewares} from '../store/store'

const getMockAuthReducer = jest.fn(
  initialState => (state = initialState.auth, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
)

const getMockGoalReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
              break;
          }
          return state
    }
)

const getMockModalReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
              break;
          }
          return state
    }
)
const getMockTaskReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
              break;
          }
          return state
    }
)

export const getMockStore = (initialState) => {
  const mockAuthReducer = getMockAuthReducer(initialState);
  const mockGoalReducer = getMockGoalReducer(initialState)
  const mockModalReducer = getMockModalReducer(initialState)
  const mockTaskReducer = getMockTaskReducer(initialState)
  const rootReducer = combineReducers({
    auth: mockAuthReducer,
    goal: mockGoalReducer,
    task: mockTaskReducer,
    modal: mockModalReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
}

