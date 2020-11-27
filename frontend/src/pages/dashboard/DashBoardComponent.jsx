import React, {Component} from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import './DashBoard.css'
import {DashBoardPanel} from './DashBoardPanel/DashBoardPanelComponent'
import {DashBoardCards} from './DashBoardCards/DashBoardCardsComponent'
class DashBoardComponent extends Component {
    render(){
        return(
            <div className='dashboard'>
                <div className='menubar'>
                    <MenuBar/>
                </div>
                <Grid columns='2' divided >
                    <GridColumn className="dashboardGrid">
                        {/* <h2 className="dashboardTitle">Your Dashboard</h2> */}
                        <DashBoardPanel/>
                    </GridColumn>
                    <GridColumn>
                        <DashBoardCards/>
                    </GridColumn>
                </Grid>
            </div>
        )
    }
}

export default DashBoardComponent