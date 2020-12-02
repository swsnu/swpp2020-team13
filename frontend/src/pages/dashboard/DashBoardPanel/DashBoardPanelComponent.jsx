import React, {Component} from 'react'
import { useState, useEffect } from 'react';
import ReactWordcloud from 'react-wordcloud';
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container} from 'semantic-ui-react'
import './DashBoardPanel.css'
import {VictoryPie, VictoryTheme, VictoryLabel} from 'victory'
import SVG from 'react-inlinesvg'

export const DashBoardPanel = (props)  => {

    const percentage = props.metric
    const wantedMetric = [{ y: percentage }, { y: 100-percentage }]; // Data that we want to display
    const defaultMetric = [{ y: 0 }, { y: 100 }, ]; 

    const [metric, setMetric] = useState(defaultMetric);

    useEffect(() => {
        setMetric(wantedMetric); // Setting the data that we want to display
    }, []);

    // const data = [
    //     {text: "test" ,value: 210},
    //     {text: "test1" ,value: 100},
    //     {text: "test2" ,value: 90},
    //     {text: "test3" ,value: 100},
    //     {text: "test4" ,value: 60},
    //     {text: "test5" ,value: 150},
    //     {text: "test6" ,value: 170},
    //     {text: "test7" ,value: 80},
    //     {text: "test8" ,value: 210},
    //     {text: "test9" ,value: 100},
    //     {text: "test10" ,value: 90},
    //     {text: "test11" ,value: 100},
    //     {text: "test12" ,value: 60},

    // ]
    const cloud_options = {
        rotations: 2,
        rotationAngles: [-90, 0],
        fontFamily: "impact",
        fontSizes: [12, 38],
        fontStyle: "normal",
        fontWeight: "normal",
        colors: [
            "#173f5f70",
            "#20639b",	
            "#ed553b",	
            "#04837c" ]
    }

    
    const renderPie = () =>  {
        return (
        <svg viewBox="0 0 500 400">
            <VictoryPie
            standalone={false}
            animate={{ easing: 'exp' }}
            labelComponent={<span/>}
            width={500} height={400}
            data={metric}
            innerRadius={166}
            colorScale={["#19B3A6", "#EEEEEE" ]}
            // style={{ labels: { fontSize: 20, fill: "white" } }}
            />
            <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 50 }}
            x={250} y={200}
            text={percentage+"%"}
            />
        </svg>
        )
    }

    return(
        <div className="DashBoardPanel">
            {/* <h2>Overall Info</h2> */}
            <Grid className="DashBoardPanelGrid">
                <Grid.Row>
                    <Segment
                    style={
                        {boxShadow: "none"}
                        }>
                        <h5>WordCloud of goal tags</h5>
                        <ReactWordcloud 
                        className="wordCloud" 
                        words={props.wordList} 
                        options={cloud_options}
                        />                        
                    </Segment>
                </Grid.Row>
                <Grid.Row className="goalsDoneRow">
                    <Segment className="goalsDoneSegment"
                    style={
                        {boxShadow: "none"}
                        }>
                        <h5>Percentage of Finished Goals</h5>
                        {renderPie()}
                    </Segment>
                </Grid.Row>
                <Grid.Row>
                    {/* {TBD} */}
                </Grid.Row>
            </Grid>
        </div>
    )
    
}
