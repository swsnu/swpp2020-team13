import React, {Component} from 'react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class CreateGoal extends Component {
    render(){
        return(
            <div className='menubar'>
                <MenuBar/>
                <h2> Add a Goal</h2>
            </div>
        )
    }
}

export default withRouter(CreateGoal)