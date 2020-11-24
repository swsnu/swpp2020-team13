import React from 'react'
import reducerModal from './modalReducer'
import * as actionTypes from '../actions/types'

describe("ModalReducer", () => {
    it("should close modal", ()=>{
        const newState = reducerModal({authModal: false, addAcc: false, addTask: false}, 
            {
                type: actionTypes.CLOSE_MODAL,
            })
        expect(newState).toEqual({authModal: false, addTask: false, addAcc: false})
    })

    it("should open auth modal", ()=>{
        const newState = reducerModal({authModal: false, addAcc: false, addTask: false}, 
            {
                type: actionTypes.OPEN_AUTH_MODAL,
            })
        expect(newState).toEqual({authModal: true})
    })

    it("should open add task modal", ()=>{
        const newState = reducerModal({authModal: false, addAcc: false, addTask: false}, 
            {
                type: actionTypes.OPEN_ADD_TASK_MODAL,
            })
        expect(newState).toEqual({addTask: true})
    })

    it("should close add task modal", ()=>{
        const newState = reducerModal({authModal: false, addAcc: false, addTask: false}, 
            {
                type: actionTypes.CLOSE_ADD_TASK_MODAL,
            })
        expect(newState).toEqual({addTask: false})
    })

    it("should open add acc modal", ()=>{
        const newState = reducerModal({authModal: false, addAcc: false, addTask: false}, 
            {
                type: actionTypes.OPEN_ADD_ACC_MODAL,
            })
        expect(newState).toEqual({addAcc: true})
    })

    it("should close add acc modal", ()=>{
        const newState = reducerModal({authModal: false, addAcc: false, addTask: false}, 
            {
                type: actionTypes.CLOSE_ADD_ACC_MODAL,
            })
        expect(newState).toEqual({addAcc: false})
    })
})