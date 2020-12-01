import React, {Component} from 'react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import { withRouter } from 'react-router-dom'
import { Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../../history'
import GeneralGoalInfo from './Components/GeneralGoalInfo'
import TaskAndAchTotal from './TaskAndAchTotal';
import './GoalDetailPage.css'
import {getGoal} from '../../store/actions'

const mapStateToProps = state => {
    console.log("DETAIL selectedGoal: ", state.goal.selectedGoal)
    return{
        selectedGoal: state.goal.selectedGoal,
        // taskList: state.task.tasks,
    }
}

class GoalDetailPage extends Component {


    componentDidMount() {
        console.log("mounting")
        this.props.getGoal(this.props.match.params.id)
    }

    render() {
        {console.log(this.props.selectedGoal)}
        return (
            <div className="GoalDetailPage">
                <div className='menubar'>
                    <MenuBar/>
                </div>
                {(this.props.selectedGoal !== null)&&<GeneralGoalInfo selectedGoal={this.props.selectedGoal}/>}
                {(this.props.selectedGoal !== null)&&<TaskAndAchTotal tasks={this.props.selectedGoal.tasks}/>}
            </div>
        )
    }
}

export default connect(mapStateToProps, {getGoal}) (withRouter(GoalDetailPage))
