import React, {Component} from 'react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import GoalBodyComponent from '../../components/GoalBody/GoalBodyComponent'
import Axios from 'axios'
import * as actionCreators from '../../store/actions/'
import moment from 'moment'
import EditGoal from './EditGoalComponent'
import EditTask from './EditTaskComponent'
import { Button, Container } from 'semantic-ui-react'
import './EditPage.css'
class EditPage extends Component {
    state = {
        editGoal: true
    }

    render() {
        return (
            <div>
                <div className='menubar'>
                    <MenuBar/>
                </div>
                <div className="EditGoalTaskTab">
                {/* <Container className="EditGoalTaskContainer"> */}
                    <Button.Group className="EditGoalTaskButtonGroup">
                        <Button className="EditGoalTabButton" onClick={()=>this.setState({editGoal: true})}>Edit Goal</Button>
                        <Button className="EditTaskTabButton" onClick={()=>this.setState({editGoal: false})}>Edit Tasks</Button>
                    </Button.Group>            
                {/* </Container> */}
                    {this.state.editGoal ? 
                    <>
                    <h2>Edit a Goal</h2> 
                    < EditGoal />
                    </>
                    : <EditTask/>}
                </div>
            </div>
        )
    }
}

export default EditPage
