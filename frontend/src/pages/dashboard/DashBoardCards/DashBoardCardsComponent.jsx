import React, {Component} from 'react'
import { useState, useEffect } from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Dropdown, Card} from 'semantic-ui-react'
import './DashBoardCards.css'
import GoalCard from '../../../components/DashBoardGoalCards/DashBoardGoalCard'
import { useSelector, useDispatch } from 'react-redux';
import history from '../../../history';
import moment from 'moment'

class DashBoardCards extends Component{

    // console.log(props.goalCardList)
    state = {
        select: 0,
        show: 0,
        max: (this.props.goalCardList.length)/6,
        showOptions: [
            { key: 1, text: 'Show All', value: 1 },
            { key: 2, text: 'Ongoing', value: 2 },
            { key: 3, text: 'Finished', value: 3 },
            { key: 4, text: 'Future', value: 4 },
        ]

    }

    // goalCardList = goalCardList.map(g => <GoalCard goal={g}/>)
    
    renderShowbyTime = (value) =>{
        const today = moment(new Date).startOf('day').unix()
        let list = []
        switch(value) {
            case(1):
                return this.props.goalCardList.map(g => <GoalCard goal={g}/>)
            case(2):
                list = this.props.goalCardList.reduce((pre, g) => {
                    if((g.start_at <= today) && (g.deadline >= today)) {
                        pre.push(g)
                    }
                    return pre
                }, [])
                return list.map(g => <GoalCard goal={g}/>)
            case(3):
                list = this.props.goalCardList.reduce((pre, g) => {
                    if(g.deadline < today) {
                        pre.push(g)
                    }
                    return pre
                }, [])
                return list.map(g => <GoalCard goal={g}/>)
            case(4):
                list = this.props.goalCardList.reduce((pre, g) => {
                    if(g.start_at > today) {
                        pre.push(g)
                    }
                    return pre
                }, [])
                return list.map(g => <GoalCard goal={g}/>)
            default:
                return this.props.goalCardList.map(g => <GoalCard goal={g}/>)
        }
    }

    // range select by clicking buttons
    renderSelect = () => {
        let start = (this.state.select*6)
        let selectedList = this.renderShowbyTime(this.state.show)
        return (
            selectedList.slice(start, start+6)
        )
    }

    prevHandler = () => {
       this.setState({select: (select-1)})
    }

    nextHandler = () => {
        this.setState({select: (select+1)})
    } 

    render() {
    return (
        <div className="DashBoardGoalCards">
            <h2
            style={
                { paddingTop: '5px' }
            }
            >Your Goals</h2>        

                <Dropdown placeholder='Filter by' search selection options={this.state.showOptions} onChange={(e,data)=>this.setState({show: data.value})}
                style = {{border: 'none', marginRight: '20px', marginLeft: '5px'}}
                />

                <Button.Group>
                <Button size="tiny" disabled={this.state.select == 0 ? true : false} onClick={() => this.prevHandler()} icon='angle left' className="dashcardprev">
                </Button>
                <Button size="tiny" disabled={this.state.select == (Math.floor(this.state.max)) ? true : false} onClick={() => this.nextHandler()} icon='angle right' className="dashcardnext"></Button>
                {/* {console.log("DEBUG: next and max", select, Math.floor(max))} */}
            </Button.Group>
            <Segment
            style={
                {boxShadow: "none", border: 'none'}
                }>
                <Card.Group>
                    {this.renderSelect()}
                </Card.Group>
            </Segment>
        </div>
    )
            }
}

export default DashBoardCards