import React from 'react'
import reducerExplore from './exploreReducer'
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

describe('exploreReducer', () => {
    afterEach(() => {
        jest.clearAllMocks()
      })

      it("should render initial state", () => {
        const newState = reducerExplore(undefined, {})
        expect(newState).toEqual({goals: [], selectedGoal: null, achievements: []})

    })

    it("should render exp_getAllGoal", () => {
        const newState = reducerExplore(undefined, {
            type: actionTypes.EXPLORE_GET_ALL_GOAL,
            goals: [
                stubGoal
            ]
        })
        expect(newState).toEqual({goals: [stubGoal], selectedGoal: null, achievements: []})
    })

    it("should render exp_getGoal", () => {
        const newState = reducerExplore(undefined, {
            type: actionTypes.EXPLORE_GET_GOAL,
            target: stubGoal         
        })
        expect(newState).toEqual({goals: [], selectedGoal: stubGoal, achievements: []})
    })

    it("should render exp_get_ach", () => {
        const achList = [{des: "des"}]
        const newState = reducerExplore(undefined, {
            type: actionTypes.EXPLORE_GET_ACH_BY_GOAL,
            achievements: achList       
        })
        expect(newState).toEqual({goals: [], selectedGoal: null, achievements: achList})
    })
    
});
