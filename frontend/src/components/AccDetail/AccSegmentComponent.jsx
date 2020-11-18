import React, {Component} from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container} from 'semantic-ui-react'
import { connect } from 'react-redux'
import Axios from 'axios'
import moment from 'moment'
import history from '../../history'
import AccCard from './AccCardComponent'
import './AccSegment.css'

class AccSegment extends Component {

    render() {
        return(
            <Segment className="AccContainer" >
                <h4>Your accomplishment of "{this.props.title}"!</h4>
                <Grid columns='2'className="AccGrid" divided>
                    <Grid.Column width={5} className="AccContainerPercentage">
                        "percentage"
                    </Grid.Column>
                    <Grid.Column width={9} className="AccContainerDetail">
                        <AccCard/>
                    </Grid.Column>
                    {/* <p>"Example Description"</p> */}
                </Grid>
                <p className="description">Example Description</p>
            </Segment>
        )
    }
}

export default AccSegment
