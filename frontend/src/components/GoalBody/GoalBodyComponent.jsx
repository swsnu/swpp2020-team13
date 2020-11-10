import React, {Component} from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container} from 'semantic-ui-react'
import './GoalBody.css'
import TaskBarComponent from '../TaskBar/TaskBarComponent'

class GoalBodyComponent extends Component {
    // props have goal id, title, deadline, and tags
    // the tasks here are originally from backend
    // TODO: connect with redux

    state = {
        selectedDate: null,
        sampleTaskList:[
            {
                "id": 1,
                "user": 1,
                "goal": 2,
                "title": "task_test_title_1",
                "created_at": "2020-11-05 07:04:59",
                "updated_at": "2020-11-05 07:04:59",
                "deadline": "2020-11-09 05:38:20",
                "importance": 3,
                "DAYS_OF_WEEK": [
                    "Monday",
                ]
            },
            {
                "id": 2,
                "user": 1,
                "goal": 2,
                "title": "task_test_title_2",
                "created_at": "2020-11-05 07:04:59",
                "updated_at": "2020-11-05 07:04:59",
                "deadline": "2020-11-10 05:38:20",
                "importance": 5,
                "DAYS_OF_WEEK": [
                    "None",
                ]
            },
            {
                "id": 3,
                "user": 1,
                "goal": 2,
                "title": "task_test_title_3",
                "created_at": "2020-11-05 07:04:59",
                "updated_at": "2020-11-05 07:04:59",
                "deadline": "2020-11-10 05:38:20",
                "importance": 4,
                "DAYS_OF_WEEK": [
                    "Friday",
                ]
            }
        ]
    }

    // const toTaskBar // map from sampleTaskList
    // TODO: implement selectCertainTask function - select tasks depending on date & deadline & day of week

    deadlineDate = (deadline) => {
        return deadline.split(" ")[0]
    }

    render() {
        const toTaskBar = this.state.sampleTaskList.map((task) => {
                return(<TaskBarComponent
                    title={task.title} 
                    id={task.id} 
                    deadline={task.deadline} 
                    DAYS_OF_WEEK={task.DAYS_OF_WEEK}/>)
            })

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
                    {/* <Button.Group className="DeleteGoalButtonGroupAnother" floated="left">
                    <Button size="tiny" compact icon className="DeleteGoalButtonA"><Icon name='edit'/></Button>
                    <Button size="tiny" compact icon className="DeleteGoalButtonA"><Icon name='trash'/></Button>
                    </Button.Group>  */}
                    <Button circular floated="right" icon="add" size="mini" className="GoalBodyAddButton"></Button>
            </List.Item>
            {/* <Button circular floated="right" icon="add" size="mini" className="GoalBodyAddButton"></Button> */}
            <br></br>
        </Segment>
    )
    }
}

export default GoalBodyComponent