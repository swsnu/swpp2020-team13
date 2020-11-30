import React, {Component} from 'react'
import { Container, Segment, Grid, Label, Button } from 'semantic-ui-react'
import './TaskAndAchTotal.css'
import {TaskInfo} from './Components/TaskInfo'
import {Ach} from './Components/Ach'
import {AchInfo} from './Components/AchInfo'

class TaskAndAchTotal extends Component {

    render(){
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
                    >
                    <p>&nbsp;&nbsp;TASKS YOU'VE DONE</p>
                    
                    <TaskInfo/>
                    <TaskInfo/>
                    <TaskInfo/>
                    <TaskInfo/>
                    </Grid.Column>

                    <Grid.Column
                    style={
                        {paddingTop: '0px',}
                    }>
                    <p>&nbsp;ACHIEVEMENT INFO</p>
                        <AchInfo/>
                    <p>&nbsp;ACHIEVEMENT JOURNAL</p>
                        <Ach/>
                        <Button.Group floated="right">
                            <Button size="tiny" icon='angle left'style={
                                {backgroundColor: "#FFFFFF"}
                            }>
                            </Button>
                            <Button size="tiny" icon='angle right'
                            style={
                                {backgroundColor: "#FFFFFF"}
                            }></Button>
                            {/* {console.log("DEBUG: next and max", select, Math.floor(max))} */}
                        </Button.Group>
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}

export default TaskAndAchTotal