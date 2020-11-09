import React, {Component} from 'react'
import { List, Icon, Checkbox, Grid, Button} from 'semantic-ui-react'
import './TaskBar.css'
class TaskBarComponent extends Component {

    isRecurrent(daylist) {
        if(daylist.includes("None")) {
            return(
                <Button.Group size="tiny" floated="right">
                <Button icon>
                    <Icon name='pencil alternate' />
                </Button>
                </Button.Group>
            )
        }
        else {
            return (
          <Button.Group size="tiny" floated="right">
            <Button icon>
              <Icon name='redo' />
          </Button>
          <Button icon>
              <Icon name='pencil alternate' />
          </Button>
          </Button.Group>
          
          )
        }
    }
    render() {
        return(
        <List.Item className="TaskBarListItem">
            <List.Content floated='right'>
            {this.isRecurrent(this.props.DAYS_OF_WEEK)}
            </List.Content>
            <Icon className="TaskBarListTriangle" name='right triangle'/>
            <List.Content className="TaskBarListContent">{this.props.title}</List.Content>
            </List.Item>
        )
    }
}

export default TaskBarComponent