import React, {Component} from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container} from 'semantic-ui-react'
import { connect } from 'react-redux'
import Axios from 'axios'
import moment from 'moment'
import history from '../../history'
import './AccSegment.css'
import { VictoryPie, VictoryTheme, VictoryLabel } from 'victory'
import SVG from 'react-inlinesvg'
import Rating from '@material-ui/lab/Rating'
import { openAddAccModal } from '../../store/actions/index'
import AddAccForm from '../AddAcc/AddAccForm'

class AccSegment extends Component {

    state = {
        addAccopen: false,
        achievement: null
    }

    onClickEditAchievement = achievement => {
        this.setState({ addAccopen : true, achievement })
    }

    onClickAddAccHandler = () => {
        this.setState({ addAccopen : true })
    }

    renderTotal = () => {
        let achievement = null
        // this.props.today is a Date object
        const today_ts = moment(this.props.today).startOf('day').unix() + (24*60*60) -1
        const achievement_selected = this.props.achievements.filter(a => ( a.written_at == today_ts ) && (a.task == this.props.task.id) )
        if (achievement_selected.length > 0) {
            achievement = achievement_selected[0]
        }

        if (achievement) {
            console.log("udpaet this.set.achievement")
            const metric = achievement.percentage_complete
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
                                    data={[{'key': "", 'y': metric}, {'key': "", 'y': (100-metric)} ]}
                                    innerRadius={166}
                                    colorScale={["#19B3A6", "#EEEEEE" ]}
                                    // style={{ labels: { fontSize: 20, fill: "white" } }}
                                />
                                <VictoryLabel
                                    textAnchor="middle"
                                    style={{ fontSize: 50 }}
                                    x={260} y={260}
                                    text={metric + "%"}
                                />
                            </svg>
                            <p className="AccChartTitle">percentage done</p>
                        </Grid.Column>
                        <Grid.Column width={9} className="AccContainerDetail">
                            {/* <AccCard/> */}
                            <Grid columns='2'>
                                <Grid.Column width='5'>
                                    <h5>See Photo Preview</h5>
                                </Grid.Column>
                                <Grid.Column width='10'>
                                <img id="image" src={achievement.photo} className="AccPreviewImage"></img>
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                        {/* <p>"Example Description"</p> */}
                    </Grid>
                    <br></br>
                    <div className="description">
                        <Icon name='pencil alternate' style={{color: '#5F5F5F'}}/>{achievement.description}
                        {/* <p>Example Description</p> */}
                    </div>
                    <div className="description">
                        <Button floated='right' size="tiny" onClick={() => this.onClickEditAchievement(achievement)} id="EditAchButton">Edit</Button>
                        <br></br>
                        <br></br>
                    </div>
                </Segment>
            ) 
        }
        else {
            // console.log(this.props.achievements)
            return(
                <Segment className="DefaultAchSegment">
                    <h4>No achievements yet. Add one if you're done!</h4>
                    {(!this.state.addAccopen) && <Button onClick={this.onClickAddAccHandler} className="DefaultAchAddButton">Add an Achievement</Button>}
                    {/* {this.state.addAccopen && <AddAccForm onSubmit={this.onCloseSubmit} today={this.props.today} task_id={this.props.task.id}/>} */}
                </Segment>
            )
        }
    }
    
    onCloseSubmit = () => {
        this.setState({addAccopen: false})
    }

    onSetAccSubmit = (ach) => {
        this.setState({achievement: ach})
    }

    render() {
        return(
            <>
                {this.state.addAccopen ? 
                    <AddAccForm 
                        today={this.props.today} 
                        task_id={this.props.task.id} 
                        onSubmit={this.onCloseSubmit}
                        achievement={this.state.achievement}
                    /> 
                    : this.renderTotal()
                }
            </>
        )
    }
}



export default AccSegment

