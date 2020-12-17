import React, {Component} from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import { RecCardsGroup } from './RecCardsGroup'
import { explore_getAllGoal } from '../../store/actions'
import { connect } from 'react-redux'
import history from '../../history'

class ExplorePage extends Component {

    componentDidMount() {
        if (this.props.auth) {
            this.props.explore_getAllGoal()
        }
    }

    render(){
        if (!this.props.auth) {
            history.push('/')
            return (null)
        }

        return (
            <div className='dashboard'>
                <div className='menubar'>
                    <MenuBar/>
                </div>
                <h3 style={
                    {
                        paddingLeft: "138px",
                        paddingTop: "7px",
                        marginTop: '15px',
                        paddingBottom: "10px",
                        fontSize: "30px",
                        // borderBottom: '1px solid',
                    }
                }>
                    Explore new goals
                </h3>
                <RecCardsGroup goals={this.props.goals}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log("EXPLORE all goals:", state.explore.goals)
    return{
        goals: state.explore.goals,
        auth: state.auth
    }
}

export default connect(mapStateToProps, {explore_getAllGoal}) (ExplorePage)