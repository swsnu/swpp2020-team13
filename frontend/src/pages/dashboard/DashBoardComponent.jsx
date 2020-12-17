import React, {Component} from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import './DashBoard.css'
import { DashBoardPanel } from './DashBoardPanel/DashBoardPanel'
import DashBoardCards from './DashBoardCards/DashBoardCardsComponent'
import { connect } from 'react-redux'
import { getAllGoal } from '../../store/actions/index'
import moment from 'moment'
import history from '../../history'
class DashBoardComponent extends Component {

    componentDidMount() {
        if (this.props.auth) {
            this.props.getAllGoal()
        }
    }

    getMetric = () => {
        console.log(this.props)
        if(this.props.goals.length == 0) return 0
        const today = moment(new Date).startOf('day').unix()
        let list = this.props.goals.reduce((pre, g) => {
            if(g.deadline < today) {
                pre.push(g)
            }
            return pre
        }, [])
        return (Math.floor( (list.length * 100 ) / (this.props.goals.length) ))
    }

    // get wordcloud list 
    getWordCloud = () => {
        let wordList = []
        for(var goal of this.props.goals){
            for(var tag of goal.tags) {
                let obj = wordList.find(w => w.text == tag)
                if(obj == undefined) {
                    // add new
                    wordList.push({text: tag, value: 10})
                }
                // already exist, just add 1
                else {
                    obj.value += 10
                }
            }
        }
        console.log("wordlist", wordList)
        return wordList
    }

    render(){

        if (!this.props.auth) {
            history.push('/')
            return (null)
        }

        return(
            <div className='dashboard'>
                <div className='menubar'>
                    <MenuBar/>
                </div>
                <Grid columns='2' divided >
                    <GridColumn className="dashboardGrid">
                        {/* <h2 className="dashboardTitle">Your Dashboard</h2> */}
                        <DashBoardPanel metric={this.getMetric()} wordList={this.getWordCloud()}/>
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
        goals: state.goal.goals,
        auth: state.auth
    }
}

export default connect(mapStateToProps, {getAllGoal}) (DashBoardComponent)