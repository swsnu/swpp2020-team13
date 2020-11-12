import React, {Component} from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container} from 'semantic-ui-react'
import './GoalBody.css'
import TaskBarComponent from '../TaskBar/TaskBarComponent'
import AddTaskModal from './AddTaskModal/AddTaskModal'
import { connect } from 'react-redux'
import Axios from 'axios'
import { deleteGoal, openAddTaskModal} from '../../store/actions/index'

class GoalBodyComponent extends Component {
    // props have goal id, title, deadline, and tags
    // the tasks here are originally from backend
    // TODO: connect with redux

    state = {
        selectedDate: null,
        addTaskModal: false,
        tasks: this.props.tasks ? this.props.tasks : []
    }

    // const toTaskBar // map from sampleTaskList
    // TODO: implement selectCertainTask function - select tasks depending on date & deadline & day of week

    onClickDeleteHandler = () => {
        this.props.deleteGoal(this.props.id)
    }

    onClickAddTaskHandler = () => {
        this.setState({ addTaskModal : true})
        this.props.openAddTaskModal()
    }

    deadlineDate = (deadline) => {
        return deadline.split(" ")[0]
    }

    render() {
        {console.log("on goalbodycomponent", this.props.tasks)}
        const toTaskBar = this.props.tasks.map((task) => {
            if(task){
                return(<TaskBarComponent
                    title={task.title} 
                    id={task.id} 
                    deadline={task.deadline} 
                    days_of_week={task.day_of_week}/>)
                    }
                }       
            )

    return(
        <Segment className="GoalBodySegment">
            <List className="GoalBodyTitleList">
                <List.Item className="GoalBodyListItem">
                <Icon name='circle' className="GoalBodyListIcon" size="small"/>
                    <List.Content className="GoalBodyListTitle">
                        <List.Header className="GoalBodyListTitleHeader">{this.props.title}</List.Header>
                        {/* <List.Item className="GoalBodyListDeadline">Until {this.deadlineDate(this.props.deadline)}</List.Item> */}
                        <div className="GoalBodyListDeadline">Until {this.deadlineDate(this.props.deadline)}</div>
                    </List.Content>
                </List.Item>
            </List>
            <List className="GoalBodyListwithTask" celled>
                {toTaskBar}
            </List>
            <List.Item>
                    <Button.Group className="DeleteGoalButtonGroupAnother" floated="left">
                    <Button size="tiny" compact icon className="DeleteGoalButtonA"><Icon name='edit'/></Button>
                    <Button size="tiny" compact icon className="DeleteGoalButtonA" onClick={()=>this.onClickDeleteHandler()}><Icon name='trash'/></Button>
                    </Button.Group> 
                    <Button circular onClick={()=>this.onClickAddTaskHandler()} floated="right" icon="add" size="tiny" className="GoalBodyAddButton"></Button>
            </List.Item>
            {/* <Button circular floated="right" icon="add" size="mini" className="GoalBodyAddButton"></Button> */}
            {console.log("DEBUG: this.props.id (goal id passed)", this.props.id)}
            {this.props.isAddTaskModalOpen && <AddTaskModal goal_id={this.props.id} goal_deadline={this.props.deadline}/>}
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

export default connect(mapStateToProps, { openAddTaskModal, deleteGoal }) (GoalBodyComponent)