import React, {Component} from 'react'
import { useState, useEffect } from 'react';
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container, Card} from 'semantic-ui-react'
import './DashBoardCards.css'
import GoalCard from '../../../components/DashBoardGoalCards/DashBoardGoalCard'
import { set } from 'date-fns';


export const DashBoardCards = (props) => {

    const testCard = <GoalCard/>
    const [select, setSelect] = useState(0)
    const testCardList = [testCard, testCard, testCard, testCard, testCard, testCard, testCard]
    const max = (testCardList.length)/6
    const [buttonList, setButtonList] = useState([])

    const renderSelect = () => {
        let start = (select*6)
        return (
            testCardList.slice(start, start+6)
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
