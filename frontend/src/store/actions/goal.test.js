import axios from 'axios'
import * as actionCreatorsGoal from './goal'
import store from '../store'

const stubGoal = {
    id: 1, 
    tasks: [],
    deadline: '2020-11-13',
    title: 'TEST',
    tags: [ 'tags' ]
}

describe("Action goal.js", () => {
    const stubGoalList = [stubGoal]

    it('getAllGoal should fetch goal correctly', (done)=> {
        const spy = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
            return new Promise((resolve, reject) => {
                const result = {
                  status: 200,
                  data: stubGoalList
                };
                resolve(result);
        })
    })

    store.dispatch(actionCreatorsGoal.getAllGoal()).then(() => {
        const newState = store.getState();
        expect(newState.goal.goals).toBe(stubGoalList);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
        })
    })

it('getGoal should fetch article correctly', (done)=> {
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

  store.dispatch(actionCreatorsGoal.getGoal()).then(() => {
    const newState = store.getState();
    expect(newState.goal.selectedGoal).toBe(stubGoal);
    expect(spy).toHaveBeenCalledTimes(1);
    done();
  })
    
})

it('addGoal with file should add goal correctly', (done) => {

    const spyGet = jest.spyOn(axios, 'get')
    .mockImplementation((url, td) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: {url: "photoUrl"}
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
          data: stubGoal
        }
        resolve(result)
      })
    })

    store.dispatch(actionCreatorsGoal.addGoal(new FormData, "file")).then(() => {
    expect(spyGet).toHaveBeenCalledTimes(1)
    expect(spyPut).toHaveBeenCalledTimes(1)
    expect(spyPost).toHaveBeenCalledTimes(1)    
    done()
  })
})

it('addGoal without file should add goal correctly', (done) => {

    const spyPost = jest.spyOn(axios, 'post')
    .mockImplementation((url, td) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubGoal
        }
        resolve(result)
      })
    })

    store.dispatch(actionCreatorsGoal.addGoal(new FormData, null)).then(() => {
    expect(spyPost).toHaveBeenCalledTimes(1)    
    done()
  })
})

it('editGoal with file & with key should add goal correctly', (done) => {

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
          data: {url: "photoUrl", key: 10}
        }
        resolve(result)
      })
    })

    store.dispatch(actionCreatorsGoal.editGoal(1, new FormData, "file", 50)).then(() => {
    expect(spyPut).toHaveBeenCalledTimes(3) 
    done()
  })
})

it('editGoal with file & with key should add goal correctly', (done) => {

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
          data: {url: "photoUrl", key: 10}
        }
        resolve(result)
      })
    })
    let data = new FormData
    data.append('photo', "https://goalingball-test.s3.amazonaws.com/")
    store.dispatch(actionCreatorsGoal.editGoal(1, data, "file", 50)).then(() => {
    expect(spyPut).toHaveBeenCalledTimes(3) 
    done()
  })
})

it('editGoal with file & without key should add goal correctly', (done) => {

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

    store.dispatch(actionCreatorsGoal.editGoal(1, new FormData, "file", null)).then(() => {
    expect(spyGet).toHaveBeenCalledTimes(1)
    expect(spyPut).toHaveBeenCalledTimes(3)  
    done()
  })
})

it('editGoal without file & with key should add goal correctly', (done) => {

    const spyPut = jest.spyOn(axios, 'put')
    .mockImplementation((url, td) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubGoal
        }
        resolve(result)
      })
    })

    store.dispatch(actionCreatorsGoal.editGoal(1, new FormData, null, 50)).then(() => {
    expect(spyPut).toHaveBeenCalledTimes(1)    
    done()
  })
})

it('editGoal without file & without key should add goal correctly', (done) => {

    const spyPut = jest.spyOn(axios, 'put')
    .mockImplementation((url, td) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubGoal
        }
        resolve(result)
      })
    })

    store.dispatch(actionCreatorsGoal.editGoal(1, new FormData, null, null)).then(() => {
    expect(spyPut).toHaveBeenCalledTimes(1)    
    done()
  })
})

it('deleteGoal should delete goal properly', (done)=> {
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

    store.dispatch(actionCreatorsGoal.deleteGoal()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      done()
        })
    })

})