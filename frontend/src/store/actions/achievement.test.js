import axios from 'axios'
import * as actionCreatorsAch from './achievement'
import store from '../store'

const stubAch = {
    id: 1, 
    goal_id: 1,
    task_id: 1
}

describe('Action ach.js', () => {
    it('get_achievement_of_task', (done)=> {
        const spy = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                  status: 200,
                  data: stubAch
                };
                resolve(result);
        })
    })
    store.dispatch(actionCreatorsAch.get_achievements_of_task(1)).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
        })
    })

    it('get_achievement_of_goal', (done)=> {
        const spy = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                  status: 200,
                  data: stubAch
                };
                resolve(result);
        })
    })
    store.dispatch(actionCreatorsAch.get_achievements_of_goal(1)).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
        })
    })

    it('add achievement with file should add goal correctly', (done) => {

        const spyGet = jest.spyOn(axios, 'get')
        .mockImplementation((url, td) => {
          return new Promise((resolve, reject) => {
            const result = {
              status: 200,
              data: {url: "photoUrl", key: "1"}
            }
            resolve(result)
          })
        })
    
        const spyPut = jest.spyOn(axios, 'put')
        .mockImplementation((url, td) => {
          return new Promise((resolve, reject) => {
            const result = {
              status: 200,
              data: "photoUrl"
            }
            resolve(result)
          })
        })
    
        const spyPost = jest.spyOn(axios, 'post')
        .mockImplementation((url, td) => {
          return new Promise((resolve, reject) => {
            const result = {
              status: 200,
              data: stubAch
            }
            resolve(result)
          })
        })
    
        store.dispatch(actionCreatorsAch.add_achievement(new FormData, "file")).then(() => {
        expect(spyGet).toHaveBeenCalledTimes(1)
        expect(spyPut).toHaveBeenCalledTimes(1)
        expect(spyPost).toHaveBeenCalledTimes(1)    
        done()
      })
    })
    
    it('add_achievement without file should add goal correctly', (done) => {

        const spyPost = jest.spyOn(axios, 'post')
        .mockImplementation((url, td) => {
          return new Promise((resolve, reject) => {
            const result = {
              status: 200,
              data: stubAch
            }
            resolve(result)
          })
        })
    
        store.dispatch(actionCreatorsAch.add_achievement(new FormData, null)).then(() => {
        expect(spyPost).toHaveBeenCalledTimes(1)    
        done()
      })
    })


it('edit_ach with file & with key should add goal correctly', (done) => {

    const spyPut = jest.spyOn(axios, 'put')
    .mockImplementation((url, td) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: {url: "photoUrl"}
        }
        resolve(result)
      })
    })

    store.dispatch(actionCreatorsAch.edit_achievement(1, new FormData, "file", 50)).then(() => {
    expect(spyPut).toHaveBeenCalledTimes(3) 
    done()
  })
})

it('edit_ach with file & without key should add goal correctly', (done) => {

    const spyGet = jest.spyOn(axios, 'get')
    .mockImplementation((url, td) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: {key: 50}
        }
        resolve(result)
      })
    })

    const spyPut = jest.spyOn(axios, 'put')
    .mockImplementation((url, td) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: "photoUrl"
        }
        resolve(result)
      })
    })

    store.dispatch(actionCreatorsAch.edit_achievement(1, new FormData, "file", null)).then(() => {
    expect(spyGet).toHaveBeenCalledTimes(2)
    expect(spyPut).toHaveBeenCalledTimes(3)  
    done()
  })
})

it('edit_ach without file & with key should add goal correctly', (done) => {

    const spyPut = jest.spyOn(axios, 'put')
    .mockImplementation((url, td) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubAch
        }
        resolve(result)
      })
    })

    store.dispatch(actionCreatorsAch.edit_achievement(1, new FormData, null, 50)).then(() => {
    expect(spyPut).toHaveBeenCalledTimes(1)    
    done()
  })
})

it('edit_ach without file & without key should add goal correctly', (done) => {

    const spyPut = jest.spyOn(axios, 'put')
    .mockImplementation((url, td) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubAch
        }
        resolve(result)
      })
    })

    store.dispatch(actionCreatorsAch.edit_achievement(1, new FormData, null, null)).then(() => {
    expect(spyPut).toHaveBeenCalledTimes(1)    
    done()
  })
})

it('delete_ach should delete goal properly', (done)=> {
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

    store.dispatch(actionCreatorsAch.delete_achievement()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      done()
        })
    })

    it('handle when delete_ach fails', (done)=> {
        const spy = jest.spyOn(axios, 'delete')
          .mockImplementation(url => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 404,
                data: null,
              }
              resolve(result);
            })
          })
    
        store.dispatch(actionCreatorsAch.delete_achievement()).then(() => {
          expect(spy).toHaveBeenCalledTimes(1)
          done()
            })
        })
    
    
})
