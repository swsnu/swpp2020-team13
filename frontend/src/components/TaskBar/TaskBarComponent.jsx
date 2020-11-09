import React, {Component} from 'react'
import { List, Icon } from 'semantic-ui-react'
import './TaskBar.css'
class TaskBarComponent extends Component {

    isRecurrent(daylist) {
        if(daylist.includes("None")) {
            return(
                null
            )
        }
        else {
            return (<Icon name='redo' /> )
        }
    }
    render() {
        return(
        <List.Item className="TaskBarListItem">
            <Icon name='right triangle' />
            <List.Content className="TaskBarListContent">
            {this.props.title}
            </List.Content>
            {this.isRecurrent(this.props.DAYS_OF_WEEK)}
            </List.Item>
        )
    }
}

export default TaskBarComponent