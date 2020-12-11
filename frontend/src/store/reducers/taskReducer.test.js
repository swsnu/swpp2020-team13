import React from 'react'
import reducerTask from './taskReducer'
import * as actionTypes from '../actions/types'

const stubTask = {
    id: 1,
    title: "title",
    deadline: 1000,
    day_of_week: [],
}

describe("TaskReducer", () => {

    afterEach(() => {
        jest.clearAllMocks()
      })

    it("should render initial state", () => {
        const newState = reducerTask(undefined, {})
        expect(newState).toEqual({tasks: [], selectedTask: null})

    })

    it("should render getAllTask", () => {
        const newState = reducerTask(undefined, {
            type: actionTypes.GET_ALL_TASK,
            payload: [
                stubTask
            ]
        })
        expect(newState).toEqual({tasks: [stubTask], selectedTask: null})
    })

    it("should render addTask", () => {
        const newState = reducerTask(undefined, {
            type: actionTypes.ADD_TASK,
            payload: 
                stubTask
            
        })
        expect(newState).toEqual({tasks: [stubTask], selectedTask: null})
    })

    it("Should render deleteTask", () => {
        const stubInitialState = {
            tasks:[stubTask],
            selectedTask: null
        }
        const newState = reducerTask(stubInitialState, {
            type: actionTypes.DELETE_TASK,
            payload: 1,
        })
        expect(newState).toEqual({tasks: [], selectedTask: null})
    })


})