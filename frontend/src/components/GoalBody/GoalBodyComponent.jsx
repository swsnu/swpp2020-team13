import React, {Component} from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container} from 'semantic-ui-react'
import './GoalBody.css'
import TaskBarComponent from '../TaskBar/TaskBarComponent'
import AddTaskModal from './AddTaskModal/AddTaskModal'
import { connect } from 'react-redux'
import Axios from 'axios'
import { deleteGoal, openAddTaskModal, getGoal, } from '../../store/actions/index'
import moment from 'moment'
import history from '../../history'

class GoalBodyComponent extends Component {
    // props have goal id, title, deadline, and tags
    // the tasks here are originally from backend
    // TODO: connect with redux

    state = {
        tasks: this.props.goal.tasks,
        selectedDate: null,
        addTaskModal: false,
        showAll:false,
        // tasks: this.props.goal.tasks ? this.props.goal.tasks : []
    }

    // TODO: implement selectCertainTask function - select tasks depending on date & deadline & day of week - done
    onClickEditGoalHandler = async () => {
        // change "selectedGoal" in state.goals
        // TODO: do we need to fetch it from backend? Why not just modify the store without accessing the backend?
        await this.props.getGoal(this.props.goal.id)
        history.push('/edit')
    }

    onClickDeleteHandler = () => {
        let deleteGoal = window.confirm("Tasks and achievements of this goal will be lost. Are you sure?")
        if (deleteGoal) {
          this.props.deleteGoal(this.props.goal.id)
        }
    }

    onClickAddTaskHandler = () => {
        this.setState({ addTaskModal : true})
        this.props.openAddTaskModal()
    }

    // start_at is a timestamp
    startAtDate = (start_at) => {
        return moment.unix(start_at).format('MMM Do YYYY')
        // return moment.unix(deadline).format('LL')
    }

    // deadline is a timestamp
    deadlineDate = (deadline) => {
        return moment.unix(deadline).format('MMM Do YYYY')
        // return moment.unix(deadline).format('LL')
    }

    to_weekdays = (num) => {
        switch(num){
            case(1):
                return "MONDAY"
            case(2):
                return "TUESDAY"
            case(3):
                return "WEDNESDAY"
            case(4):
                return "THURSDAY"
            case(5):
                return "FRIDAY"
            case(6):
                return "SATURDAY"
            case(0):
                return "SUNDAY"
        }
    }

    render() {
        console.log("GoalBodyComponent this.props.goal: ", this.props.goal)
        const { title, id, deadline, start_at, tags, tasks } = this.props.goal
        const today = moment(this.props.today).startOf('day').unix()
        // console.log(today)

        const filtered_tasks_date = tasks.reduce((pre, t)=> {
            // today should be included in the range
           if((t.start_at <= today) && (t.deadline >= today)) {
               pre.push(t)
           }
           return pre
        }, [])

        const filtered_tasks = filtered_tasks_date.reduce((pre, t) => {
            if(t.day_of_week.length == 0) {pre.push(t)}
            else {
                console.log(moment(this.props.today).weekday())
                const weekday = this.to_weekdays(moment(this.props.today).weekday())
                if(t.day_of_week.includes(weekday)) {
                    pre.push(t)
                }
            }
            return pre
        }, [])

        // console.log(tasks)
        // console.log(filtered_tasks_date)
        let toTaskBar = []
        if(this.state.showAll) {
            toTaskBar =  tasks.map(task => <TaskBarComponent task={task} key={task.id} goal={this.props.goal.id} today={this.props.today}/>)
        }
        else {
            toTaskBar = filtered_tasks.map(task => <TaskBarComponent task={task} key={task.id} goal={this.props.goal.id} today={this.props.today}/>)
        }
        // let toTaskBar = []
        // if((tasks !== undefined) && (tasks.length > 0)){toTaskBar = tasks.map(task => <TaskBarComponent task={task} key={task.id} />)}
        
        // console.log("[DEBUG] GoalBodyComponent is rendering. this.props.goal: ", this.props.goal)
        // console.log("[DEBUG] GoalBodyComponent is rendering. tasks: ", tasks)

    return(
        <Segment className="GoalBodySegment">
            <List className="GoalBodyTitleList">
                <List.Item className="GoalBodyListItem">
                <Icon name='circle' className="GoalBodyListIcon" size="small"/>
                    <List.Content className="GoalBodyListTitle">
                        <List.Header className="GoalBodyListTitleHeader">
                            {title}
                            <Button 
                                floated="right" 
                                size="tiny"
                                toggle active={this.state.showAll} 
                                onClick={()=>{this.setState({showAll: !(this.state.showAll)})}}
                                id="showAllTaskButton"
                            >
                                Show All Tasks
                            </Button>
                        </List.Header>
                        {/* <List.Item className="GoalBodyListDeadline">Until {this.deadlineDate(this.props.deadline)}</List.Item> */}
                        <div className="GoalBodyListDeadline">From {this.startAtDate(start_at)}, Until {this.deadlineDate(deadline)}</div>
                    </List.Content>
                </List.Item>
            </List>
            <List className="GoalBodyListwithTask" celled>
                {toTaskBar}
            </List>
            <List.Item>
                    <Button.Group className="DeleteGoalButtonGroupAnother" floated="left">
                        <Button size="tiny" compact icon id="EditButtonGoalBody" onClick={()=>this.onClickEditGoalHandler()}
                            style={
                                {
                                    backgroundColor: "#ffffff",
                                    padding: '5px'
                                }
                            }>
                            <Icon name='edit'/>
                            </Button>
                        <Button size="tiny" compact icon id="DeleteButtonGoalBody" onClick={()=>this.onClickDeleteHandler()}
                            style={
                                {
                                    backgroundColor: "#ffffff",
                                    padding: '5px'
                                }
                            }>
                            <Icon name='trash'/></Button>
                    </Button.Group> 
                    <Button circular onClick={()=>this.onClickAddTaskHandler()} floated="right" icon="add" size="tiny" className="GoalBodyAddButton" id="AddButtonGoalBody"></Button>
            </List.Item>
            {/* <Button circular floated="right" icon="add" size="mini" className="GoalBodyAddButton"></Button> */}
            {(this.state.addTaskModal && this.props.isAddTaskModalOpen) && <AddTaskModal goal_id={id} goal_deadline={deadline} goal_start_at={start_at}/>}
            <br></br>
        </Segment>
    )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        isAddTaskModalOpen: state.modal.addTask
    }
}

export default connect(mapStateToProps, { openAddTaskModal, deleteGoal, getGoal }) (GoalBodyComponent)