import React, {Component} from 'react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import { Segment, Grid } from 'semantic-ui-react'
import './CurrentGoalsComponent.css';
import PieGraph from '../../components/Dashboard/PieGraphComponent'
import LineGraph from '../../components/Dashboard/LineGraphComponent'


class CurrentGoals extends Component {
    render () {
        return (
            <div>
                <div className='menubar'>
                    <MenuBar/>
                </div>

                <div class="goalTab">
                    <button class="goalButton">CURRENT GOALS</button>
                    <button class="goalButton">HISTORY</button>
                </div>

                <br></br>
                <Grid class="chartGrid">
                    <Segment class="pieSegment">
                        <PieGraph/>
                    </Segment>
                    
                    <Segment class="lineSegment">
                        <LineGraph/>
                    </Segment>
                </Grid>     

            </div>
        )
    }
}

export default CurrentGoals