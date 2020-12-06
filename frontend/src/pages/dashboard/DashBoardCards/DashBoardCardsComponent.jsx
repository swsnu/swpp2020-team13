import React, {Component} from 'react'
import { useState, useEffect } from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Dropdown, Card} from 'semantic-ui-react'
import './DashBoardCards.css'
import GoalCard from '../../../components/DashBoardGoalCards/DashBoardGoalCard'
import { useSelector, useDispatch } from 'react-redux';
import history from '../../../history';
import moment from 'moment'

export const DashBoardCards = (props) => {

    // console.log(props.goalCardList)

    // goalCardList = goalCardList.map(g => <GoalCard goal={g}/>)
    const [select, setSelect] = useState(0)
    const [show, setShow] = useState(0)
    const max = (props.goalCardList.length)/6

    const showOptions = [
        { key: 1, text: 'Show All', value: 1 },
        { key: 2, text: 'Ongoing', value: 2 },
        { key: 3, text: 'Finished', value: 3 },
        { key: 4, text: 'Future', value: 4 },
    ]
    
    const renderShowbyTime = (value) =>{
        const today = moment(new Date).startOf('day').unix()
        let list = []
        switch(value) {
            case(1):
                return props.goalCardList.map(g => <GoalCard goal={g}/>)
            case(2):
                list = props.goalCardList.reduce((pre, g) => {
                    if((g.start_at <= today) && (g.deadline >= today)) {
                        pre.push(g)
                    }
                    return pre
                }, [])
                return list.map(g => <GoalCard goal={g}/>)
            case(3):
                list = props.goalCardList.reduce((pre, g) => {
                    if(g.deadline < today) {
                        pre.push(g)
                    }
                    return pre
                }, [])
                return list.map(g => <GoalCard goal={g}/>)
            case(4):
                list = props.goalCardList.reduce((pre, g) => {
                    if(g.start_at > today) {
                        pre.push(g)
                    }
                    return pre
                }, [])
                return list.map(g => <GoalCard goal={g}/>)
            default:
                return props.goalCardList.map(g => <GoalCard goal={g}/>)
        }
    }

    // range select by clicking buttons
    const renderSelect = () => {
        let start = (select*6)
        let selectedList = renderShowbyTime(show)
        return (
            selectedList.slice(start, start+6)
        )
    }

    const prevHandler = () => {
       setSelect(select-1)
    }

    const nextHandler = () => {
        setSelect(select+1)
    } 

    return (
        <div className="DashBoardGoalCards">
            <h2
            style={
                { paddingTop: '5px' }
            }
            >Your Goals</h2>        

                <Dropdown placeholder='Filter by' search selection options={showOptions} onChange={(e,data)=>setShow(data.value)}
                style = {{border: 'none', marginRight: '20px', marginLeft: '5px'}}
                />

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
                <Card.Group>
                    {renderSelect()}
                </Card.Group>
            </Segment>
        </div>
    )
}
