import React, {Component} from 'react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import CalendarPanel from '../../components/CalendarPanel/CalendarPanelComponent'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react';

class GoalList extends Component {
    render(){
        return(
            <Container>
                <div className='menubar'>
                    {console.log(this.props)}
                    <MenuBar/>
                    <h2> Main Page</h2>
                </div>
                <div className='calendarpanel'>
                    <CalendarPanel/>
                </div>
            </Container>
        )
    }
}

export default GoalList