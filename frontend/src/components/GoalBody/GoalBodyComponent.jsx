import React from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment} from 'semantic-ui-react'
import './GoalBody.css'

const GoalBodyComponent = (props) => {
    // props have goal id, title, deadline, and tags
    // the tasks here are originally from backend
    // TODO: connect with redux

    const sampleTaskList = []

    // const toTaskBar // map from sampleTaskList

    const deadlineDate = (deadline) => {
        return deadline.split(" ")[0]
    }

    return(
        <Segment className="GoalBodySegment">
            <List className="GoalBodyList">
                <List.Item>
                    <List.Content>
                        <List.Header>{props.title}</List.Header>
                        Until: {deadlineDate(props.deadline)}
                    </List.Content>
                </List.Item>
            </List>
        </Segment>
    )

}

export default GoalBodyComponent