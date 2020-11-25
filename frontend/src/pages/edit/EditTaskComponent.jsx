import React, {Component} from 'react'
import TaskBody from '../../components/TaskBody/TaskBodyComponent'
class EditTask extends Component {

    render(){
        let toTaskBody = []
        toTaskBody = this.props.tasks.map(t => <TaskBody task={t} key={t.id} />)

        return (
            <div className="EditTaskComp">
            {console.log("DEBUG: tasks info", this.props.tasks)}
            {toTaskBody}
            </div>
        )
    }
}

export default EditTask