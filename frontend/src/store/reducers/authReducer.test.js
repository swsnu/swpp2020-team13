import React from 'react'
import reducerAuth from './authReducer'
import * as actionTypes from '../actions/types'

describe("AuthReducer", () => {
    it("should render signup", ()=> {
        const newState = reducerAuth(null, 
            {
                type: actionTypes.SIGNUP_USER,
                payload: {
                    id: 1
                }
            })
        expect(newState).toEqual({id: 1})
    })
    it("should render login", ()=> {
        const newState = reducerAuth(null, 
            {
                type: actionTypes.LOGIN_USER,
                payload: {
                    id: 1
                }
            })
        expect(newState).toEqual({id: 1})
    })
    it("should render logout", ()=> {
        const newState = reducerAuth(null, 
            {
                type: actionTypes.LOGOUT_USER,
                payload: {
                    id: 1
                }
            })
        expect(newState).toEqual(null)
    })

})