import React, {Component} from 'react'
import { List, Icon, Checkbox, Grid, Button, Segment} from 'semantic-ui-react'
import './TaskBar.css'
import AccSegment from '../AccDetail/AccSegmentComponent'
import { deleteTask, get_achievements_of_task } from '../../store/actions/index'
import { connect } from 'react-redux'

class TaskBarComponent extends Component {

    state = {
        acc_open: false,
        accomplishment: null,
        addAccopen: false,
        achievement: {des: "des", percentage_done: 0}
    }

    // componentDidMount = () => {
    //     console.log("TODAY in taskbar" ,this.props.today)
    // }

    //need to fetch accomplishments from a selected task
    //select the accomplishment with the same date

    deleteTaskHandler = () => {
        console.log("DEBUG date send", this.props.goal, this.props.task.id)
        this.props.deleteTask(this.props.goal, this.props.task.id)
    }

    to_weekdays = (num) => {
        switch(num){
            case("MONDAY"):
                return "Mon"
            case("TUESDAY"):
                return "Tue"
            case("WEDNESDAY"):
                return "Wed"
            case("THURSDAY"):
                return "Thu"
            case("FRIDAY"):
                return "Fri"
            case("SATURDAY"):
                return "Sat"
            case("SUNDAY"):
                return "Sun"
        }
    }

    toRecString(daylist) {
        let str = ""
        const d_str = daylist.map(d => this.to_weekdays(d))
        for (var d of d_str) {
            str = str + d + ", " 
        }
        return str.substring(0, (str.length)-2)
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
                <Button icon className="TaskBarButton" id="X" onClick={this.deleteTaskHandler}>
                    <Icon name='x' />
                </Button>
                </Button.Group>
          )
        }
    }

    accOpenHandler = async () => {
        if(this.state.acc_open == false) {
            await this.props.get_achievements_of_task(this.props.task.id)
            // console.log("ACHIEVEMENTS", this.props.achievements)
            this.setState({acc_open: true})
        }
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
                    <Button icon className="TaskBarListTriangle" onClick={()=>this.accOpenHandler()}><Icon name='right triangle'/></Button>
                        {title} 
                {/* <Button icon className="TaskBarListTriangle" onClick={this.accOpenHandler}><Icon name='right triangle'/></Button>
                    {title}  */}
                </List.Content>
                    {/* {this.state.acc_open && <p>"Show Accomplishment"</p>} */}
            </List.Item>
            {this.state.acc_open && <AccSegment task={this.props.task} today={this.props.today} achievements={this.props.achievements}/>}
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        achievements: Object.values(state.achievement),
    }
}

export default connect(mapStateToProps, { deleteTask, get_achievements_of_task }) (TaskBarComponent)