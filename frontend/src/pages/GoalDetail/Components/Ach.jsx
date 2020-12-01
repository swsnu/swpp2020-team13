import React, {Component} from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container} from 'semantic-ui-react'
import { connect } from 'react-redux'
import './Ach.css'
import {VictoryPie, VictoryTheme, VictoryLabel} from 'victory'
import SVG from 'react-inlinesvg'
import Rating from '@material-ui/lab/Rating'
import moment from 'moment'

export const Ach = (props) => {
    const percentage = props.achievement.percentage_complete
    const dateString = moment.unix(props.achievement.written_at).format('MMM Do YYYY')
    return(
        <Segment className="AccContainer" >
            <h4>Your achievement on {dateString}</h4>
            <br></br>
            <Grid columns='2'className="AccGrid" divided
            style={
                {marginLeft: '0px'}
            }
            >
                <Grid.Column width={6} className="AccContainerPercentage"
                style={
                    {paddingLeft: '2px'}
                }>
                    {/* "percentage" */}
                    <svg viewBox="0 0 520 520">
                        <VictoryPie
                        standalone={false}
                        labelComponent={<span/>}
                        width={520} height={520}
                        data={[{'key': "", 'y': percentage}, {'key': "", 'y': (100-percentage)} ]}
                        innerRadius={166}
                        colorScale={["#19B3A6", "#EEEEEE" ]}
                        // style={{ labels: { fontSize: 20, fill: "white" } }}
                        />
                        <VictoryLabel
                        textAnchor="middle"
                        style={{ fontSize: 50 }}
                        x={260} y={260}
                        text={percentage + "%"}
                        />
                    </svg>
                    <p className="AccChartTitle">percentage done</p>
                </Grid.Column>
                <Grid.Column width={10} className="AccContainerDetail">
                    {/* <AccCard/> */}
                    <Grid columns='2'>
                        <Grid.Column width='5'>
                            <h5>See Photo Preview</h5>
                        </Grid.Column>
                        <Grid.Column width='10'
                        style={
                            {paddingLeft: '0px'}
                        }
                        >
                        <img id="image" src={props.achievement.photo} className="AccPreviewImage"></img>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                {/* <p>"Example Description"</p> */}
            </Grid>
            <div className="description">
                <Icon name='pencil alternate' style={{color: '#5F5F5F'}}/>{props.achievement.description}
                {/* <p>Example Description</p> */}
            </div>
            <div className="description">
                <br></br>
            </div>
        </Segment>
    ) 
}