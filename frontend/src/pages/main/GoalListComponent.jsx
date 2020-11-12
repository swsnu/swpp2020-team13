import React, {Component} from 'react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import CalendarPanel from '../../components/CalendarPanel/CalendarPanelComponent'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react';
import GoalBodyComponent from '../../components/GoalBody/GoalBodyComponent'
import './GoalListComponent.css'
import Axios from 'axios'
import * as actionCreators from '../../store/actions/'

const mapStateToProps = state => {
    return{
        goalList: state.goal.goals,
        taskList: state.task.tasks
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onGetAllGoals: () => dispatch(actionCreators.getAllGoal()),
        onGetAllTasks: () => dispatch(actionCreators.getAllTask())
    }
}
class GoalList extends Component {

    state = {
        today: new Date()
    }

    componentDidMount(){
        console.log(this.props.goalList)
        this.props.onGetAllGoals()
        this.props.onGetAllTasks()
    }

    stringtoDate = (string) => {
        var ymd = string.split(" ")[0]
        var syear = ymd.split("-")[0]
        var smonth = ymd.split("-")[1]
        var sdate = ymd.split("-")[2]
        return new Date(Number(syear), Number(smonth)-1, Number(sdate))
    }

    selectTodayGoals() {
        const today = this.state.today
        // today = new Date(today.getTime()+ 540*60*1000)
        // console.log("todaydate")
        // console.log(today)
        const todayGoals = this.props.goalList.filter((goal)=> {
            let deadline = this.stringtoDate(goal.deadline)
            console.log("selectTodaygoals")
            // console.log(created_at)
            console.log(deadline)
            return ((today <= deadline))
        })
        return todayGoals
    }
 
    onDeadlineSubmit = (date) => {
        this.setState({today: date})
    }

    render(){

        //map sampleGoalList to goalBodyComponent
        const todayGoalsList = this.selectTodayGoals()
        const toGoalBody = todayGoalsList.map((goal) => {
            const tasks = this.props.taskList.filter(t => t.goal_id == goal.id)
            console.log("filtered tasks", tasks)
                return(<GoalBodyComponent 
                    title={goal.title} 
                    id={goal.id} 
                    deadline={goal.deadline} 
                    tags={goal.tags}
                    tasks={tasks}
                    />)
            })
        return(
            <div>
                <div className='menubar'>
                    {console.log(this.props)}
                    <MenuBar/>
                </div>
                <div className='calendarpanel'>
                    <CalendarPanel onSubmit={this.onDeadlineSubmit}/>
                </div>
                <div className='goallist'>
                    <h2 className="componentTitle">What's for today?</h2>
                    {toGoalBody}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (GoalList)