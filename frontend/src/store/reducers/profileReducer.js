import * as actionTypes from '../actions/types'

const initialState = {
    profile: [
        /*photo = '',
        name = '',
        bio = '',
        tags = '',
        statistics = '',
        cards = ''*/
    ],
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_PROFILE:
            return {...state, profile: action.profile}

        case actionTypes.EDIT_PROFILE:
            /*const modifiedProfile = {
                photo = action.photo,
                name = action.name,
                bio = action.bio,
                tag = action.tag,
            }
            return {...state, profile: modifiedProfile}*/
            return {...state, profile: action.profile}

        default:
            break
    }
    return state
}

export default reducer