import React from 'react'
import reducerAch from './achievementReducer'
import * as actionTypes from '../actions/types'

const stubGoal = {
    id: 1,
    title: "title",
    photo: "photo.com",
    deadline: 1000,
    start_at: 1000,
    tags: [],
    tasks: []
}

describe('achReducer', () => {
    afterEach(() => {
        jest.clearAllMocks()
      })

    it("should render initial state", () => {
        const newState = reducerAch(undefined, {})

    })


    it("should render get_ach_task", () => {
        const achList = [{des: "des"}]
        const newState = reducerAch(undefined, {
            type: actionTypes.GET_ACHIEVEMENTS_OF_TASK,
            payload: achList       
        })
    })

    it("should render get_ach_goal", () => {
        const achList = [{des: "des"}]
        const newState = reducerAch(undefined, {
            type: actionTypes.GET_ACHIEVEMENTS_OF_GOAL,
            payload: achList       
        })
    })

    it("should render add_ach", () => {
        const achList = {des: "des"}
        const newState = reducerAch(undefined, {
            type: actionTypes.ADD_ACHIEVEMENT,
            payload: {des: "des", id: 1}    
        })
    })

    it("should render edit_ach", () => {
        const achList = {des: "des"}
        const newState = reducerAch(undefined, {
            type: actionTypes.EDIT_ACHIEVEMENT,
            payload: {des: "des", id: 1}    
        })
    })

    it("should render delete_ach", () => {
        const achList = {des: "des"}
        const newState = reducerAch(undefined, {
            type: actionTypes.DELETE_ACHIEVEMENT,
            payload: {des: "des", id: 1}    
        })
    })
    
});
