import React, {Component} from 'react'
import { useState, useEffect } from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container, Card} from 'semantic-ui-react'
import './DashBoardCards.css'
import GoalCard from '../../../components/DashBoardGoalCards/DashBoardGoalCard'
import { useSelector, useDispatch } from 'react-redux';
import history from '../../../history';
import moment from 'moment'
import { getAllGoal } from '../../../store/actions'

export const DashBoardCards = (props) => {

    let goalCardList = useSelector(state => state.goal.goals)
    const dispatch = useDispatch()
    console.log(goalCardList)

    goalCardList = goalCardList.map(g => <GoalCard goal={g}/>)
    const [select, setSelect] = useState(0)
    const max = (goalCardList.length)/6

    const renderSelect = () => {
        let start = (select*6)
        return (
            goalCardList.slice(start, start+6)
        )
    }

    useEffect(()=>{
        dispatch(getAllGoal())
    }, [])

    const prevHandler = () => {
       setSelect(select-1)
    }

    const nextHandler = () => {
        setSelect(select+1)
     } 
     

    return (
        <div className="DashBoardGoalCards">
            <h2>Your Goals</h2>        
                <Button>
                        Only show ongoings
                </Button>
                <Button.Group>
                <Button size="tiny" disabled={select == 0 ? true : false} onClick={() => prevHandler()} icon='angle left' className="dashcardprev">
                </Button>
                <Button size="tiny" disabled={select == (Math.floor(max)) ? true : false} onClick={() => nextHandler()} icon='angle right' className="dashcardnext"></Button>
                {/* {console.log("DEBUG: next and max", select, Math.floor(max))} */}
            </Button.Group>
            <Segment
            style={
                {boxShadow: "none", border: 'none'}
                }>
                <Card.Group itemsPerRow={3}>
                    {renderSelect()}
                </Card.Group>
            </Segment>
        </div>
    )
}
