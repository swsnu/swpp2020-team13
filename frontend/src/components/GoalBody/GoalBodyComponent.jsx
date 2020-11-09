import React, {Component} from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment} from 'semantic-ui-react'
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
    // TODO: implement selectCertainTask function

    deadlineDate = (deadline) => {
        return deadline.split(" ")[0]
    }

    render() {
    return(
        <Segment className="GoalBodySegment">
            <List className="GoalBodyListTitle">
                <List.Item>
                    <List.Content>
                        <List.Header>{props.title}</List.Header>
                        Until: {deadlineDate(props.deadline)}
                    </List.Content>
                </List.Item>
            </List>
            <List className="GoalBodyListwithTask">

            </List>
        </Segment>
    )
    }
}

export default GoalBodyComponent