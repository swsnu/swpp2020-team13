import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import App from './App'
import store from './store/store'
import { expect } from 'chai'

// import { getMockStore } from './test-utils/mocks'
// import { history } from './store'

// const mockStore = getMockStore({ goals: [], selectedGoal: null });

// jest.mock('./pages/main/GoalListComponent', () => {
//   return jest.fn(props => {
//     return (
//       <div className="spyGoalList">
//         {props.title}
//       </div>);
//   });
// });

// jest.mock('./containers/ArticleList/AddArticle/AddArticle', ()=> {
//   return jest.fn(props => {
//     return (
//       <div className="spyAddArticle">
//         {props.title}
//       </div>);
//   });
// })



describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><App /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders <App /> component', () => {
    const component = mount(<Provider store={store}><App /></Provider>)
    const wrapper = component.find('.App')
    expect(wrapper).lengthOf(1)
  })
})

// describe('App', ()=> {
//   let app

//   beforeEach(()=> {
//     app = (
//         <App history={history}/>
//     )
//   })

//   it('should render', () => {
//     const component = shallow(app);
//     expect(component.find('.App').length).toBe(1);
//   });

//   it('should render login page', ()=> {
//     history.push('/login')
//     const component = mount(app)
//     expect(component.find('.Login').find('h1').text()).toBe('Login')
//   })

//   it('should render articles page', () => {
//     history.push('/articles')
//     const component = mount(app);
//     expect(component.find('.spyArticleList').length).toBe(1);
//   });

//   it('should render create article page', () => {
//     history.push('/articles/create')
//     const component = mount(app);
//     expect(component.find('.spyAddArticle').length).toBe(1);
//   });

// })
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
