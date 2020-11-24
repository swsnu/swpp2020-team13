import _ from 'lodash';
import * as actionTypes from '../actions/types'

export default reducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.GET_ACHIEVEMENTS_OF_TASK:
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case actionTypes.GET_ACHIEVEMENTS_OF_GOAL:
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case actionTypes.ADD_ACHIEVEMENT:
            return {...state, [action.payload.id]: action.payload}
        case actionTypes.EDIT_ACHIEVEMENT:
            return {...state, [action.payload.id]: action.payload};
        case actionTypes.DELETE_ACHIEVEMENT:
            return _.omit(state, action.payload);
        default:
            return state
    }
}