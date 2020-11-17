import React, {Component} from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container, GridColumn} from 'semantic-ui-react'
import './TaskBody.css'
import { connect } from 'react-redux'
import Axios from 'axios'
// import {} from '../../store/actions/index'
import moment from 'moment'
import Rating from '@material-ui/lab/Rating';

class TaskBodyComponent extends Component {
    // props have goal id, title, deadline, and tags
    // the tasks here are originally from backend
    // TODO: connect with redux

    state = {
        // selectedDate: null,
        // addTaskModal: false,
        // tasks: this.props.goal.tasks ? this.props.goal.tasks : []
    }

    onClickEditGoalHandler = () => {
        // TODO
    }

    onClickDeleteHandler = () => {
        // TODO
    }

    // deadline is a timestamp
    deadlineDate = (deadline) => {
        return moment(deadline).format('MMMM Do YYYY')
        // return moment.unix(deadline).format('LL')
    }

    renderDeadlineString = (task) => {
        let str = "Until: "
        str = str + this.deadlineDate(task.deadline)
        if(task.day_of_week.length !== 0) {
            var daystr = "On every "
            for (var d of task.day_of_week) {
                d = d.toLowerCase()
                d = d.charAt(0).toUpperCase() + d.slice(1);
                daystr = daystr + d + ","+ " "
            }
            daystr = daystr.slice(0, daystr.length-2)
            return (
            <div className="TaskBodyListDeadline">{str}&nbsp;&nbsp;{daystr}</div>
            )
        }
        return (
            <div className="TaskBodyListDeadline">{str}</div>
        )
    }

    render() {
        const { title, deadline, importance, day_of_week } = this.props.task
    return(
        <Segment className="TaskBodySegment">
            <List className="TaskBodyTitleList">
                <List.Item className="TaskBodyListItem">
                <Icon name='circle' className="TaskBodyListIcon" size="small"/>
                    <List.Content className="TaskBodyListTitle">
                        <List.Header className="TaskBodyListTitleHeader">    
                            {title}
                            <Rating className="TaskBodyListRating"
                                    name="simple-controlled"
                                    size="small"
                                    id="AddTaskFormImportance"
                                    value={importance}
                                    readOnly
                                />
                        </List.Header>
                            {this.renderDeadlineString(this.props.task)}
                    </List.Content>
                </List.Item>
            </List>
            <List.Item>
                    <Button.Group className="DeleteTaskButtonGroupAnother" floated="right">
                        <Button size="tiny" compact icon className="EditTaskButtonA" id="EditButtonTaskBody" onClick={()=>this.onClickEditGoalHandler()}><Icon name='edit'/></Button>
                        <Button size="tiny" compact icon className="DeleteTaskButtonA" id="DeleteButtonTaskBody" onClick={()=>this.onClickDeleteHandler()}><Icon name='trash'/></Button>
                    </Button.Group> 
            </List.Item>
            <br></br>
        </Segment>
    )
    }
}

export default (TaskBodyComponent)