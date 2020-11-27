import React, {Component} from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container} from 'semantic-ui-react'
import { connect } from 'react-redux'
import Axios from 'axios'
import moment from 'moment'
import history from '../../history'
import './AccSegment.css'
import AddAccForm from '../AddAcc/AddAccForm'

class DefaultAccSegment extends Component {

    state = {
        addAccopen: false
    }

    onClickAddAccHandler = () => {
        const before = this.state.addAccopen
        this.setState({ addAccopen : !before })
    }

    onCloseSubmit = (value) => {
        this.setState({addAccopen: value})
    }


    render() {
        return(
            <Segment>
                <h4>No achievements yet. Add one if you're done!</h4>
                {(!this.state.addAccopen) && <Button onClick={this.onClickAddAccHandler}>Add an Achievement</Button>}
                {this.state.addAccopen && <AddAccForm onSubmit={this.onCloseSubmit}/>}
            </Segment>
        )
    }
}

export default DefaultAccSegment

