import axios from 'axios'
import * as actionCreatorsTask from './task'
import store from '../store'
import { getMockStore } from '../../test-utils/mocks'

const stubTask = {
    title: 'title1',
    id: '1',
    deadline: '2020-12-31',
    day_of_week: [ '' ],
    goal_id: 1
}

const stubInitialState = {
    auth: true,
    authModal: false,
    addTask: false,
    goals: [{
        id: 1, 
        tasks: [],
        deadline: '2020-11-13',
        title: 'TEST',
        tags: [ 'tags' ]
    }]
}
const mockStore = getMockStore(stubInitialState);

describe("Action task.js", () => {

    const stubTaskList = [stubTask]

    it('getAllTask should fetch goal correctly', (done)=> {
        const spy = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                  status: 200,
                  data: stubTaskList
                };
                resolve(result);
            })
        })

    store.dispatch(actionCreatorsTask.getAllTask()).then(() => {
        const newState = store.getState();
        expect(newState.task.tasks).toBe(stubTaskList);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
        })
    })
    
    it('addTask should add task correctly', (done)=> {
        const spy = jest.spyOn(axios, 'post')
        .mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                  status: 200,
                  data: stubTask
                };
                resolve(result);
            })
        })
        let taskForm = new FormData
        taskForm.append('goal', 1)

        mockStore.dispatch(actionCreatorsTask.addTask(taskForm, "file")).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
        })
    })

    it('deletTask should delete task properly', (done)=> {
        const spy = jest.spyOn(axios, 'delete')
          .mockImplementation(url => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 200,
                data: null,
              }
              resolve(result);
            })
          })
    
        store.dispatch(actionCreatorsTask.deleteTask()).then(() => {
          expect(spy).toHaveBeenCalledTimes(1)
          done()
        })
    })


})