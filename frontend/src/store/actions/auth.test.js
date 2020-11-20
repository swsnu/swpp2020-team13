import axios from 'axios'
import * as actionCreatorsAuth from './auth'
import store from '../store'

const stubUser = {
    id: 1,
    username: "mockuser"
}

describe("Action auth.js", ()=> {

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('signup should add user properly', (done)=> {
        const spy = jest.spyOn(axios, 'post')
        .mockImplementation((url, td) => {
          return new Promise((resolve, reject) => {
            const result = {
              status: 200,
              data: stubUser
            }
            resolve(result)
          })
        })
      store.dispatch(actionCreatorsAuth.signupUser()).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done()
      })
    })

    it('login should login user properly', (done) => {
        const spy = jest.spyOn(axios, 'post')
        .mockImplementation((url, td) => {
          return new Promise((resolve, reject) => {
            const result = {
              status: 200,
              data: stubUser
            }
            resolve(result)
          })
        })
      store.dispatch(actionCreatorsAuth.loginUser()).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done()
      })
    })


})