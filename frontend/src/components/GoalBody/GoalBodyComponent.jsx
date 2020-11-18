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
        selectedDate: null,
        addTaskModal: false,
        // tasks: this.props.goal.tasks ? this.props.goal.tasks : []
    }

    // TODO: implement selectCertainTask function - select tasks depending on date & deadline & day of week
    onClickEditGoalHandler = () => {
        this.props.getGoal(this.props.goal.id)
    }

    onClickDeleteHandler = () => {
        this.props.deleteGoal(this.props.goal.id)
    }

    onClickAddTaskHandler = () => {
        this.setState({ addTaskModal : true})
        this.props.openAddTaskModal()
    }

    // deadline is a timestamp
    deadlineDate = (deadline) => {
        return moment.unix(deadline).format('MMMM Do YYYY, HH:mm:ss')
        // return moment.unix(deadline).format('LL')
    }

    render() {
        console.log("GoalBodyComponent this.props.goal: ", this.props.goal)
        const { title, id, deadline, tags, tasks } = this.props.goal
        let toTaskBar = []
        if((tasks !== undefined) && (tasks.length > 0)){toTaskBar = tasks.map(task => <TaskBarComponent task={task} key={task.id} />)}
        

        console.log("[DEBUG] GoalBodyComponent is rendering. this.props.goal: ", this.props.goal)
        console.log("[DEBUG] GoalBodyComponent is rendering. tasks: ", tasks)

    return(
        <Segment className="GoalBodySegment">
            <List className="GoalBodyTitleList">
                <List.Item className="GoalBodyListItem">
                <Icon name='circle' className="GoalBodyListIcon" size="small"/>
                    <List.Content className="GoalBodyListTitle">
                        <List.Header className="GoalBodyListTitleHeader">{title}</List.Header>
                        {/* <List.Item className="GoalBodyListDeadline">Until {this.deadlineDate(this.props.deadline)}</List.Item> */}
                        <div className="GoalBodyListDeadline">Until {this.deadlineDate(deadline)}</div>
                    </List.Content>
                </List.Item>
            </List>
            <List className="GoalBodyListwithTask" celled>
                {toTaskBar}
            </List>
            <List.Item>
                    <Button.Group className="DeleteGoalButtonGroupAnother" floated="left">
                    <Button size="tiny" compact icon className="EditGoalButtonA" id="EditButtonGoalBody" onClick={()=>this.onClickEditGoalHandler()}><Icon name='edit'/></Button>
                    <Button size="tiny" compact icon className="DeleteGoalButtonA" id="DeleteButtonGoalBody" onClick={()=>this.onClickDeleteHandler()}><Icon name='trash'/></Button>
                    </Button.Group> 
                    <Button circular onClick={()=>this.onClickAddTaskHandler()} floated="right" icon="add" size="tiny" className="GoalBodyAddButton" id="AddButtonGoalBody"></Button>
            </List.Item>
            {/* <Button circular floated="right" icon="add" size="mini" className="GoalBodyAddButton"></Button> */}
            {this.props.isAddTaskModalOpen && <AddTaskModal goal_id={id} goal_deadline={deadline}/>}
            <br></br>
        </Segment>
    )
    }
}

const mapStateToProps = state => {
    return {
        isAddTaskModalOpen: state.modal.addTask
    }
}

export default connect(mapStateToProps, { openAddTaskModal, deleteGoal, getGoal }) (GoalBodyComponent)