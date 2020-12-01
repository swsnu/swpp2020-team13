import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

export const AchInfo = (props) =>{
    let avg
    if(props.number == 0) {
        avg = 0
    }
    else avg = (props.total)/props.number
    return (
        <Segment style ={
            {boxShadow: "none"}
        }>
            <Grid columns='2' divided>
                <Grid.Column>
                    <p style={
                        {textAlign:'center', fontSize: "30px", fontWeight: "lighter"}
                    }>{props.number}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total number of achievements
                </Grid.Column>
                <Grid.Column>
                    <p style={
                        {textAlign:'center', fontSize: "30px", fontWeight: "lighter"}
                    }>{avg}%</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;average percentage complete
                </Grid.Column>
            </Grid>
        </Segment>
    )
}