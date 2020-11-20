import React, {Component} from 'react'
import { List, Icon, Checkbox, Grid, Button} from 'semantic-ui-react'
import './TaskBar.css'
import AccSegment from '../AccDetail/AccSegmentComponent'
import AddAccModal from '../AddAcc/AddAccModal'
import { deleteTask } from '../../store/actions/index'
import { connect } from 'react-redux'

class TaskBarComponent extends Component {


    state = {
        acc_open: false
    }

    deleteTaskHandler = () => {
        console.log("DEBUG date send", this.props.goal, this.props.task.id)
        this.props.deleteTask(this.props.goal, this.props.task.id)
    }

    isRecurrent(daylist) {
        // console.log("[DEBUG] TaskBarComponent isRecurrent daylist: ", daylist)
        if(daylist.length == 0) {
            return(
                <Button.Group size="tiny" floated="right">
                <Button icon className="TaskBarButton" onClick={this.deleteTaskHandler}>
                    <Icon name='x' />
                </Button>
                </Button.Group>
            )
        }
        else {
            return (
          <Button.Group size="tiny" floated="right" id="Recurrent">
            <Button icon className="TaskBarButton">
              <Icon name='redo' />
          </Button>
          <Button icon className="TaskBarButton" onClick={this.deleteTaskHandler}>
              <Icon name='x' />
          </Button>
          </Button.Group>
          
          )
        }
    }

    accOpenHandler = () => {
        if(this.state.acc_open == false) {this.setState({acc_open: true})}
        else{
            this.setState({acc_open: false})
        }
    }

    render() {
        const { title, id, deadline, day_of_week } = this.props.task
        console.log("[DEBUG] TaskBarComponent is rendering. task: ", this.props.task)
        
        return(
        <> 
        <List.Item className="TaskBarListItem">
            <List.Content floated='right'>
            {this.isRecurrent(day_of_week)}
            </List.Content>
            {/* <Button icon className="TaskBarListTriangle"><Icon name='right triangle'/></Button> */}
            {/* <Icon className="TaskBarListTriangle" name='right triangle'/> */}
            <List.Content className="TaskBarListContent">
            <Button icon className="TaskBarListTriangle" onClick={this.accOpenHandler}><Icon name='right triangle'/></Button>
                {title}
                </List.Content>
                {/* {this.state.acc_open && <p>"Show Accomplishment"</p>} */}
            </List.Item>
            {this.state.acc_open && <AccSegment task={this.props.task}/>}
            {this.props.isAddAccModalOpen && <AddAccModal/>}
            </>
        )
    }
}


export default connect(null, { deleteTask }) (TaskBarComponent)