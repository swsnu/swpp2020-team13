import React, {Component} from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import './DashBoard.css'
import {DashBoardPanel} from './DashBoardPanel/DashBoardPanelComponent'
import {DashBoardCards} from './DashBoardCards/DashBoardCardsComponent'
import { connect } from 'react-redux'
import { getAllGoal } from '../../store/actions/index'
import moment from 'moment'
class DashBoardComponent extends Component {

    componentDidMount() {
        // console.log("mounting dashboard page")
        this.props.getAllGoal()
    }

    getMetric = () => {
        const today = moment(new Date).startOf('day').unix()
        let list = this.props.goals.reduce((pre, g) => {
            if(g.deadline < today) {
                pre.push(g)
            }
            return pre
        }, [])
        return (Math.floor( (list.length * 100 ) / (this.props.goals.length) ))
    }

    render(){
        return(
            <div className='dashboard'>
                <div className='menubar'>
                    <MenuBar/>
                </div>
                <Grid columns='2' divided >
                    <GridColumn className="dashboardGrid">
                        {/* <h2 className="dashboardTitle">Your Dashboard</h2> */}
                        <DashBoardPanel metric={this.getMetric()}/>
                    </GridColumn>
                    <GridColumn>
                        <DashBoardCards goalCardList={this.props.goals}/>
                    </GridColumn>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    // console.log("dahboard all goals:", state.goal.goals)
    return{
        goals: state.goal.goals
    }
}

export default connect(mapStateToProps, {getAllGoal}) (DashBoardComponent)