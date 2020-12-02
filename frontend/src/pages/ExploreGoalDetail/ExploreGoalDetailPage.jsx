import React, {Component} from 'react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import { withRouter } from 'react-router-dom'
import { Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../../history'
import {explore_getGoal, explore_get_ach_by_goal} from '../../store/actions/index'
import TaskAndAchTotal from '../GoalDetail/TaskAndAchTotal'
import GeneralGoalInfo from '../GoalDetail/Components/GeneralGoalInfo'

const mapStateToProps = state => {
    console.log("DETAIL EXPLORE selectedGoal: ", state.explore.selectedGoal)
    return{
        selectedGoal: state.explore.selectedGoal,
        achievements: state.explore.achievements
    }
}

class ExploreGoalDetailPage extends Component {


    componentDidMount() {
        console.log("mounting explore detail")
        this.props.explore_getGoal(this.props.match.params.id)
        this.props.explore_get_ach_by_goal(this.props.match.params.id)
    }

    render() {
        debugger
        // {console.log(this.props.selectedGoal)}
        return (
            <div className="ExploreGoalDetailPage" style={
                {
                    width: '80%',
                    marginLeft: '125px',
                    maxWidth: '1190px'
                }
            }>
                <div className='menubar'>
                    <MenuBar/>
                </div>
                {(this.props.selectedGoal !== null)&&<GeneralGoalInfo selectedGoal={this.props.selectedGoal}/>}
                {(this.props.selectedGoal !== null)&&<TaskAndAchTotal tasks={this.props.selectedGoal.tasks} achievements={this.props.achievements}/>}
            </div>
        )
    }
}

export default connect(mapStateToProps, {explore_getGoal, explore_get_ach_by_goal}) (withRouter(ExploreGoalDetailPage))
