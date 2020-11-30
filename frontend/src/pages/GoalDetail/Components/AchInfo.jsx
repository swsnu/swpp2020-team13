import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

export const AchInfo = (props) =>{
    return (
        <Segment style ={
            {boxShadow: "none"}
        }>
            <Grid columns='2' divided>
                <Grid.Column>
                    <p style={
                        {textAlign:'center', fontSize: "30px", fontWeight: "lighter"}
                    }>10</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total number of achievements
                </Grid.Column>
                <Grid.Column>
                    <p style={
                        {textAlign:'center', fontSize: "30px", fontWeight: "lighter"}
                    }>70%</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;average percentage complete
                </Grid.Column>
            </Grid>
        </Segment>
    )
}