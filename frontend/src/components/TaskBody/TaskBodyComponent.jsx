import React, {Component} from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container, GridColumn, Form} from 'semantic-ui-react'
import './TaskBody.css'
import { connect } from 'react-redux'
import Axios from 'axios'
// import {} from '../../store/actions/index'
import moment from 'moment'
import Rating from '@material-ui/lab/Rating'
import { DateInput,} from 'semantic-ui-calendar-react'

import { editTask, deleteTask } from '../../store/actions'

class TaskBodyComponent extends Component {
    // props have goal id, title, deadline, and tags
    // the tasks here are originally from backend
    // TODO: connect with redux

    state = {
        editmode: false,
        readmode: true,
        title: this.props.task.title,
        importance: this.props.task.importance,
        day_of_week: this.props.task.day_of_week,
        start_at: this.props.task.start_at,
        deadline: this.props.task.deadline
    }

    onClickEditTaskHandler = () => {
       const neweditmode = !(this.state.editmode)
       const newreadmode = !(this.state.readmode)
       this.setState({editmode: neweditmode, readmode: newreadmode})
    }

    onClickDeleteTaskHandler = () => {
        // TODO
        const task_id = this.props.task.id
        const goal_id = this.props.task.goal_id
        this.props.deleteTask(goal_id, task_id);
    }

    // deadline is a timestamp
    deadlineDate = (deadline) => {
        return moment.unix(deadline).format('MMM Do YYYY')
        // return moment.unix(deadline).format('LL')
    }

    startAtDate = (start_at) => {
        return moment.unix(start_at).format('MMM Do YYYY')
        // return moment.unix(deadline).format('LL')
    }

    renderDeadlineString = (day_of_week, start_at, deadline) => {
        let str = "From "
        str = str +  this.startAtDate(start_at) + ", Until " + this.deadlineDate(deadline)
        if(day_of_week.length !== 0) {
            var daystr = "On every "
            for (var d of day_of_week) {
                d = d.toLowerCase()
                d = d.charAt(0).toUpperCase() + d.slice(1);
                daystr = daystr + d + ","+ " "
            }
            daystr = daystr.slice(0, daystr.length-2)
            return (
            <div className="TaskBodyListDeadline">{str}<br></br>{daystr}</div>
            )
        }
        return (
            <div className="TaskBodyListDeadline">{str}</div>
        )
    }

    // setDeadlineString = (string) => {
    //     console.log("[DEBUG] dadline string: ", string)
    //     const deadline = moment(string, 'YYYY-MM-DD').startOf('day').unix() + (24*60*60 - 1)
    //     // setDeadline(deadline)
    //     this.setState({deadline: deadline})
    // }

    onSubmit = e => { // e: event
        // TODO: cannot call setState during render
        // this.setState({editmode: false})
        const data = {
            title: this.state.title,
            importance: this.state.importance,
            day_of_week: this.state.day_of_week,
            start_at: moment(this.state.start_at).unix()*1000,
            deadline: moment(this.state.deadline).unix()*1000
        }
        console.log("Edit task data: ", data)

        this.props.editTask(this.props.task.id, data)

        const neweditmode = !(this.state.editmode)
        const newreadmode = !(this.state.readmode)
        this.setState({editmode: neweditmode, readmode: newreadmode})
    }  
    
    closeHandler = () => {
        const neweditmode = !(this.state.editmode)
        const newreadmode = !(this.state.readmode)
        this.setState({editmode: neweditmode, readmode: newreadmode})
    }

    // handleChange = (event, {name, value}) => {
    //     if (this.state.hasOwnProperty(name)) {
    //         console.log(moment(value))
    //       this.setState({ [name]: value });
    //     }
    //   }

    handleChangeStartAt = (event, { value }) => {
        // this.props.goal_start_at is a timestamp
        // value is in a "YYYY-MM-DD" format
        if(moment(value) < moment.unix(this.props.goal_start_at)){
            window.alert("task start date cannot be earlier than goal start date. Goal start date will be set.")
            this.setState({start_at: this.props.goal_start_at})
        }
        else {
            this.setState({ start_at: moment(value).unix() })
        }
     }

    handleChangeDeadline = (event, { value }) => {
        if(moment(value) > moment.unix(this.props.goal_deadline)){
            window.alert("Task deadline cannot be longer than goal deadline. Goal deadline will be set.")
            this.setState({ deadline: this.props.goal_deadline });
        }
        else {
            this.setState({ deadline: moment(value).unix() });
        }
      }

    renderEditMode = () => {
        const options = [
            { key: 'm', text: 'Monday', value: 'MONDAY' },
            { key: 't', text: 'Tuesday', value: 'TUESDAY' },
            { key: 'w', text: 'Wednesday', value: 'WEDNESDAY' },
            { key: 'th', text: 'Thursday', value: 'THURSDAY' },
            { key: 'f', text: 'Friday', value: 'FRIDAY' },
            { key: 's', text: 'Saturday', value: 'SATURDAY' },
            { key: 'su', text: 'Sunday', value: 'SUNDAY' },
          ]

        return (
            <Form>
            <Segment className="EditTaskForm" id="EditTaskFormSegment">
            <h3>Edit: {this.state.title}</h3>
                <Form.Group widths='equal'>
                    <Form.Input label='Title' placeholder='Enter task title' 
                    onChange={(e,data)=> this.setState({title: data.value})} 
                    id="EditTaskFormTitle"
                    defaultValue={this.state.title}
                    />
                    </Form.Group>
                        <Form.Group>
                            <Form.Select
                                multiple selection
                                label='Day of Week'
                                id="EditTaskFormDayofWeek"
                                options={options}
                                defaultValue={this.props.task.day_of_week}
                                onChange={(e,data)=>this.setState({day_of_week: data.value})}
                                placeholder='Day of Week'
                            />
                            <DateInput
                                label='Start At'
                                id="EditTaskFormDeadline"
                                name="start_at"
                                placeholder="Date"
                                value={moment.unix(this.state.start_at).format('YYYY-MM-DD')}
                                iconPosition="left"
                                dateFormat="YYYY-MM-DD"
                                onChange={this.handleChangeStartAt}
                            />
                            <DateInput
                                label='Deadline'
                                id="EditTaskFormDeadline"
                                name="deadline"
                                placeholder="Date"
                                value={moment.unix(this.state.deadline).format('YYYY-MM-DD')}
                                iconPosition="left"
                                dateFormat="YYYY-MM-DD"
                                onChange={this.handleChangeDeadline}
                            />
                        </Form.Group>
                    <Form.Group inline>
                    <label>Importance</label>
                        <Rating
                            name="simple-controlled"
                            size="large"
                            id="EditTaskFormImportance"
                            value={this.state.importance}
                            onChange={(event, newValue) => {
                                this.setState({importance: newValue})
                            }} 
                        />
                    </Form.Group>
                    <Button.Group>
                        <Button className="EditTaskSubmitButton" id="EditTaskSubmit" onClick={this.onSubmit}>Submit</Button>
                        <Button icon className="EditTaskCloseButton" id="EditTaskClose" onClick={this.closeHandler}><Icon name='x'/></Button>
                    </Button.Group>
                    {/* <Form.Button className="EditTaskSubmitButton" onClick={this.onSubmit()}>Submit</Form.Button>                     */}
                </Segment>
        </Form>
        )
    }

    renderReadMode = () => {
        const { title, deadline, importance, day_of_week } = this.props.task
        return (
            <Segment className="TaskBodySegment">
            <List className="TaskBodyTitleList">
                <List.Item className="TaskBodyListItem">
                <Icon name='circle' className="TaskBodyListIcon" size="small"/>
                    <List.Content className="TaskBodyListTitle">
                        <List.Header className="TaskBodyListTitleHeader">    
                            {this.state.title}
                            <Rating className="TaskBodyListRating"
                                    name="simple-controlled"
                                    size="small"
                                    id="AddTaskFormImportance"
                                    value={this.state.importance}
                                    readOnly
                                />
                        </List.Header>
                            {this.renderDeadlineString(this.state.day_of_week, this.state.start_at, this.state.deadline)}
                    </List.Content>
                </List.Item>
            </List>
            <List.Item>
                    <Button.Group className="DeleteTaskButtonGroupAnother" floated="right">
                        <Button className="DeleteTaskButtonA" id="DeleteButtonTaskBody" onClick={this.onClickDeleteTaskHandler}><Icon name='delete'/>&nbsp;Delete</Button>
                        <Button className="EditTaskButtonA" id="EditButtonTaskBody" onClick={()=>this.onClickEditTaskHandler()}><Icon name='edit'/>&nbsp;Edit</Button>
                    </Button.Group> 
            </List.Item>
            <br></br>
        </Segment>
        )
    }

    render() {
    return(
        <> 
        {this.state.readmode && this.renderReadMode()}
        {/* {this.renderReadMode()} */}
        {this.state.editmode && this.renderEditMode()}
        {/* {console.log(this.state.readmode, this.state.editmode)} */}
        </>
    )
    }
}


export default connect(null, { editTask, deleteTask })(TaskBodyComponent)