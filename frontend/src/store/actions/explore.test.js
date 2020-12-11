import axios from 'axios'
import * as actionCreatorsExp from './explore'
import store from '../store'

const stubGoal = {
    id: 1, 
    tasks: [],
    deadline: 1000,
    title: 'TEST',
    tags: [ 'tags' ]
}

describe('Action explore', () => {
    
    it('exp_getAllGoal should fetch goal correctly', (done)=> {
        const spy = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                  status: 200,
                  data: [stubGoal]
                };
                resolve(result);
        })
    })

    store.dispatch(actionCreatorsExp.explore_getAllGoal()).then(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        done();
        })
    })

    it('exp_getGoal should fetch article correctly', (done)=> {
        const spy = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
          return new Promise((resolve, reject) => {
            const result = {
              status: 200,
              data: stubGoal
            };
            resolve(result);
          });
        })
    
      store.dispatch(actionCreatorsExp.explore_getGoal()).then(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      }) 
    })

    it('exp_getAch should fetch goal correctly', (done)=> {
        const spy = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                  status: 200,
                  data: [stubGoal]
                };
                resolve(result);
        })
    })

    store.dispatch(actionCreatorsExp.explore_get_ach_by_goal()).then(() => {
        const newState = store.getState();
        expect(spy).toHaveBeenCalledTimes(1);
        done();
        })
    })

});

