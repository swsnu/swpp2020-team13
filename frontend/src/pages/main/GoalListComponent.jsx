import React, {Component} from 'react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class GoalList extends Component {
    render(){
        return(
            <div className='menubar'>
                {console.log(this.props)}
                <MenuBar/>
                <h2> Main Page</h2>
            </div>
        )
    }
}

export default withRouter(GoalList)