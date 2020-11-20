import React, {Component} from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container} from 'semantic-ui-react'
import { connect } from 'react-redux'
import Axios from 'axios'
import moment from 'moment'
import history from '../../history'
import AccCard from './AccCardComponent'
import './AccSegment.css'
import {VictoryPie, VictoryTheme, VictoryLabel} from 'victory'
import SVG from 'react-inlinesvg'
import Rating from '@material-ui/lab/Rating'
import { openAddAccModal } from '../../store/actions/index'
import AddAccModal from '../AddAcc/AddAccModal'

class AccSegment extends Component {

    state = {
        metric: 21,
        addAccModal: false
    }

    onClickAddAccHandler = () => {
        this.setState({ addAccModal : true})
        this.props.openAddAccModal()
    }

    renderChart = () => {
        return (

        <VictoryPie 
            padAngle={0}
            // used to hide labels
            labelComponent={<span/>}
            innerRadius={70}
            width={200} height={200}
            data={[{'key': "", 'y': this.state.metric}, {'key': "", 'y': (100-this.state.metric)} ]}
            colorScale={["#19B3A6", "#EEEEEE" ]}
        />

        )
    }

    render() {
        return(
            <Segment className="AccContainer" >
                <h4>Your accomplishment of {this.props.task.title}:</h4>
                <Grid columns="2" >
                    <Grid.Column width={2}className="importance">
                        <p>Importance</p>
                    </Grid.Column>
                    <Grid.Column className="ImportanceRating">
                        <Rating
                            name="simple-controlled"
                            size="small"
                            value={this.props.task.importance}
                            readOnly
                        />
                    </Grid.Column>
                </Grid>
                <Grid columns='2'className="AccGrid" divided>
                    <Grid.Column width={6} className="AccContainerPercentage">
                        {/* "percentage" */}
                        <svg viewBox="0 0 520 520">
                            <VictoryPie
                            standalone={false}
                            labelComponent={<span/>}
                            width={520} height={520}
                            data={[{'key': "", 'y': this.state.metric}, {'key': "", 'y': (100-this.state.metric)} ]}
                            innerRadius={166}
                            colorScale={["#19B3A6", "#EEEEEE" ]}
                            // style={{ labels: { fontSize: 20, fill: "white" } }}
                            />
                            <VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 50 }}
                            x={260} y={260}
                            text={this.state.metric + "%"}
                            />
                        </svg>
                        <p className="AccChartTitle">percentage done</p>
                    </Grid.Column>
                    <Grid.Column width={9} className="AccContainerDetail">
                        <AccCard/>
                    </Grid.Column>
                    {/* <p>"Example Description"</p> */}
                </Grid>
                <br></br>
                <div className="description">
                    <Icon name='pencil alternate' style={{color: '#5F5F5F'}}/>Example Description
                    {/* <p>Example Description</p> */}
                </div>
                <div className="description">
                    <Button floated='right' size="tiny" onClick={this.onClickAddAccHandler}>Add or Edit</Button>
                    {this.props.isAddAccModalOpen && <AddAccModal/>}
                    <br></br>
                    <br></br>
                </div>
            </Segment>
        )
    }
}


const mapStateToProps = state => {
    return {
        isAddAccModalOpen: state.modal.addAcc
    }
}

export default connect(mapStateToProps, { openAddAccModal }) (AccSegment)

