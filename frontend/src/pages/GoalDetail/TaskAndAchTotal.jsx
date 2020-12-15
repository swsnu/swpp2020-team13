import React, {Component} from 'react'
import { Container, Segment, Grid, Label, Button } from 'semantic-ui-react'
import './TaskAndAchTotal.css'
import {TaskInfo} from './Components/TaskInfo'
import {Ach} from './Components/Ach'
import {AchInfo} from './Components/AchInfo'

class TaskAndAchTotal extends Component {

    state = {
        selectedTask: null,
        achList: [],
        startIndex: 0
    }

    onTaskSubmit = (id) => {
        this.setState({selectedTask: id})
    }

    renderTaskInfo = () => {
        let taskInfo = []
        let originalTaskList = this.props.tasks
        
        originalTaskList.sort(function (a, b) { 
            return a.start_at < b.start_at ? -1 : a.start_at > b.start_at ? 1 : 0;  
        })

        taskInfo = originalTaskList.map(t => <TaskInfo task={t} onSelect={this.onTaskSubmit}   />)
        if(taskInfo.length == 0) {
            return <p style={{fontWeight: '600', fontSize: "15px"}}>&nbsp;&nbsp;No tasks added for this goal yet!</p>
        }

        return taskInfo
    }
 
    prevHandler = () => {
        this.setState({startIndex: this.state.startIndex-1})
    }
 
    nextHandler = () => {
        this.setState({startIndex: this.state.startIndex+1})
    } 
    
    renderAchTotal = () => {
        if(this.state.selectedTask) {

        // filter achList
        console.log(this.props.achievements)
        let achList
        let total = 0
        let originalAchList = this.props.achievements

        originalAchList.sort(function (a, b) { 
            return a.written_at < b.written_at ? -1 : a.written_at > b.written_at ? 1 : 0;  
        })

        achList = originalAchList.reduce((list, a) => {
            if(a.task == this.state.selectedTask) {
                list.push(<Ach achievement={a}/>)
                total = total + a.percentage_complete
            }
            return list
        }, [])

        return (
            <div>
                <p>&nbsp;ACHIEVEMENT INFO</p>
                        <AchInfo number={achList.length} total={total}/>
                        <br></br>
                    <p>&nbsp;ACHIEVEMENT JOURNAL</p>
                        {achList[this.state.startIndex]}
                        <Button.Group floated="right">
                            <Button size="tiny" icon='angle left'style={
                                {backgroundColor: "#FFFFFF"}
                            }
                            className="DashPrevAch"
                            disabled={this.state.startIndex == 0 ? true : false}
                            onClick={()=>this.prevHandler()}
                            >
                            </Button>
                            <Button size="tiny" icon='angle right'
                            style={
                                {backgroundColor: "#FFFFFF"}
                            }
                            className="DashNextAch"
                            disabled={this.state.startIndex == (achList.length-1) ? true : false}
                            onClick={()=>this.nextHandler()}
                            ></Button>
                            {/* {console.log("DEBUG: next and max", select, Math.floor(max))} */}
                    </Button.Group>
            </div>
        )
        }
    else{
        return(
            <div>
            <p>&nbsp;ACHIEVEMENT INFO</p>
                    <p style={{fontWeight: '600', fontSize: "15px"}}>&nbsp;Select a task to see achievement info!</p>
                <br></br>
                <p>&nbsp;ACHIEVEMENT JOURNAL</p>
                    <p style={{fontWeight: '600', fontSize: "15px"}}>&nbsp;Select a task to see achievement journals!</p>
            </div>
        )
    }
    }

    render(){
        console.log(this.state.selectedTask)
        return(
            <Segment className="TaskAndAchContainer"
            style={
                {boxShadow: "none", border: "none"}
                }
                >
                <Grid columns="2" divided
                    style={
                        {minHeight: '700px', marginTop: '5px'}
                    }>
                    <Grid.Column
                    style={
                        {paddingTop: '0px', paddingLeft: '0px'
                    }
                    }
                    width="7"
                    >
                    <p>&nbsp;&nbsp;TASKS YOU'VE DONE</p>
                    {this.renderTaskInfo()}
                    </Grid.Column>

                    <Grid.Column
                    width="9"
                    style={
                        {paddingTop: '0px',}
                    }>
                    {this.renderAchTotal()}
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}

export default TaskAndAchTotal