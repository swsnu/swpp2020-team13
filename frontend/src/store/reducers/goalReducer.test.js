import React from 'react'
import reducerGoal from './goalReducer'
import * as actionTypes from '../actions/types'

const stubGoal = {
    id: 1,
    title: "title",
    photo: "photo.com",
    deadline: 1000,
    tags: [],
    tasks: []
}

describe("GoalReucer", () => {

    afterEach(() => {
        jest.clearAllMocks()
      })

    it("should render initial state", () => {
        const newState = reducerGoal(undefined, {})
        expect(newState).toEqual({goals: [], selectedGoal: null})

    })

    it("should render getAllGoal", () => {
        const newState = reducerGoal(undefined, {
            type: actionTypes.GET_ALL_GOAL,
            goals: [
                stubGoal
            ]
        })
        expect(newState).toEqual({goals: [stubGoal], selectedGoal: null})
    })

    it("should render getGoal", () => {
        const newState = reducerGoal(undefined, {
            type: actionTypes.GET_GOAL,
            target: 
                stubGoal
            
        })
        expect(newState).toEqual({goals: [], selectedGoal: stubGoal})
    })

    it("should render addGoal", () => {
        const newState = reducerGoal(undefined, {
            type: actionTypes.ADD_GOAL,
            payload: 
                stubGoal
            
        })
        expect(newState).toEqual({goals: [stubGoal], selectedGoal: null})
    })

    it("should render editGoal when id is different", () => {
        const stubInitialState = {
            goals:[stubGoal],
            selectedGoal: null
        }

        const newGoal = {
            id: 1,
            title: "new_title",
            photo: "photo.com",
            deadline: 1000,
            tasks:[],
            tags: []
        }

        const newState = reducerGoal(stubInitialState, {
            type: actionTypes.EDIT_GOAL,
            id: 1,
            title: "new_title",
            photo: "photo.com",
            deadline: 1000,
            tasks:[],
            tags: []
            
        })
        expect(newState).toEqual({goals: [newGoal], selectedGoal: newGoal})
    })

    it("should render editGoal when id is different", () => {
        const stubInitialState = {
            goals:[stubGoal],
            selectedGoal: null
        }

        const newState = reducerGoal(stubInitialState, {
            type: actionTypes.EDIT_GOAL,
            id: 2,
            title: "new_title",
            photo: "photo.com",
            deadline: 1000,
            tags: []
            
        })
        expect(newState).toEqual({goals: [stubGoal], selectedGoal: undefined})
    })

    it("Should render deleteGoal", () => {
        const stubInitialState = {
            goals:[stubGoal],
            selectedGoal: null
        }
        const newState = reducerGoal(stubInitialState, {
            type: actionTypes.DELETE_GOAL,
            id: 1,
        })
        expect(newState).toEqual({goals: [], selectedGoal: null})
    })

    it("Should render addTaskToGoal", () => {
        const stubInitialState = {
            goals:[stubGoal],
            selectedGoal: null
        }
        const newState = reducerGoal(stubInitialState, {
            type: actionTypes.ADD_TASK_TO_GOAL,
            payload: {
                goal: 1,
            }
        })

        const newGoal = {
            id: 1,
            title: "title",
            photo: "photo.com",
            deadline: 1000,
            tags: [],
            tasks: [{goal: 1}]
        }
        expect(newState).toEqual({goals: [newGoal], selectedGoal: null})
    })

    it("Should render deleteTaskToGoal", () => {
         const newGoal = {
            id: 1,
            title: "title",
            photo: "photo.com",
            deadline: 1000,
            tags: [],
            tasks: [{goal: 1, id: 1}]
        }

        const stubInitialState = {
            goals:[newGoal],
            selectedGoal: null
        }
        const newState = reducerGoal(stubInitialState, {
            type: actionTypes.DELETE_TASK_TO_GOAL,
            payload: {
                goal: 1,
                id: 1
            }
        })

        expect(newState).toEqual({goals: [stubGoal], selectedGoal: null})
    })


})