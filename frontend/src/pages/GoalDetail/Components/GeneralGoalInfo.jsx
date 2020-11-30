import React, {Component} from 'react'
import { Container, Segment, Grid, Label } from 'semantic-ui-react'
import './GeneralGoalInfo.css'

class GeneralGoalInfo extends Component {

//Things to put in render: title / goal duration / tags / 
    render() {
        return(
            <div className="GeneralGoalInfoPanel">
                <Segment style={
                    {boxShadow: "none"}
                    }>
                    <Grid row='2'>
                        <Grid.Row>
                        <h2 className="GeneralGoalInfoTitle">This is goal general info title very very very very very very very very very very long</h2>
                        </Grid.Row>
                        <Grid.Row className="GeneralGoalInfoSub">
                            <Grid.Column width="5">
                                <p style ={
                                    { color: "#807e7e"}
                                }>From Nov. 24 2020, Until Dec.12 2020</p>
                            </Grid.Column>
                            <Grid.Column>
                            <Label horizontal style={
                                     {marginTop: '2px', marginBottom: '2px', backgroundColor: "#24b4ab"}
                                        }>label</Label>
                            {/* {get random color generator from dashboard goal card components} */}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        )
    }
}


export default GeneralGoalInfo