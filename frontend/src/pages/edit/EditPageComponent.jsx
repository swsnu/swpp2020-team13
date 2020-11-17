import React, {Component} from 'react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import { withRouter } from 'react-router-dom'
import EditGoal from './EditGoalComponent'
import EditTask from './EditTaskComponent'
import { Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import './EditPage.css'



const mapStateToProps = state => {
    return{
        selectedGoal: state.goal.selectedGoal,
        // taskList: state.task.tasks,
    }
}

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
                    <EditGoal selectedGoal={this.props.selectedGoal}/>
                    </>
                    : 
                    <>
                    <h2>Edit Tasks</h2> 
                    <EditTask tasks={this.props.selectedGoal.tasks}/>
                    </>}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, null) (EditPage)
