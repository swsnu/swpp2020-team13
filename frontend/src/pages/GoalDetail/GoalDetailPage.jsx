import React, {Component} from 'react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import { withRouter } from 'react-router-dom'
import { Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../../history'
import GeneralGoalInfo from './Components/GeneralGoalInfo'
import TaskAndAchTotal from './TaskAndAchTotal';
import './GoalDetailPage.css'
// const mapStateToProps = state => {
    // console.log("EditPageComponent selectedGoal: ", state.goal.selectedGoal)
    // return{
    //     selectedGoal: state.goal.selectedGoal,
    //     // taskList: state.task.tasks,
    // }
// }

class GoalDetailPage extends Component {

    render() {
        return (
            <div className="GoalDetailPage">
                <div className='menubar'>
                    <MenuBar/>
                </div>
                <GeneralGoalInfo/>
                <TaskAndAchTotal/>
            </div>
        )
    }
}

export default withRouter(GoalDetailPage)
