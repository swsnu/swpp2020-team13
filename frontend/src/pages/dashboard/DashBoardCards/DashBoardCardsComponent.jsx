import React, {Component} from 'react'
import { useState, useEffect } from 'react';
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container, Card} from 'semantic-ui-react'
import './DashBoardCards.css'
import GoalCard from '../../../components/DashBoardGoalCards/DashBoardGoalCard'
import { useSelector } from 'react-redux';
import history from '../../../history';
import moment from 'moment'

export const DashBoardCards = (props) => {
    let goalCardList = useSelector(state => state.goal.goals)
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

    // const renderButtonGroup = () => {
    //     console.log("buttongroup render called")
    //     let length = testCardList.length / 6
    //     let buttonlist = []
    //     for (var i in length) {
    //         buttonlist.push(<Button>"Button"</Button>)
    //     }
    //     setButtonList(buttonlist)
    // }

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
            <Segment>
                <Card.Group itemsPerRow={3}>
                    {renderSelect()}
                </Card.Group>
            </Segment>
        </div>
    )
}
