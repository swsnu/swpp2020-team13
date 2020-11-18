import React, {Component} from 'react'
import TaskBody from '../../components/TaskBody/TaskBodyComponent'
class EditTask extends Component {

    render(){
        let toTaskBody = []
        toTaskBody = this.props.tasks.map(t => <TaskBody task={t}/>)

        return (
            <>
            {console.log("DEBUG: tasks info", this.props.tasks)}
            {toTaskBody}
            </>
        )
    }
}

export default EditTask