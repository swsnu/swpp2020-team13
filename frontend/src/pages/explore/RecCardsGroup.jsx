import React, {Component} from 'react'
import { useState, useEffect } from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container, Card} from 'semantic-ui-react'
import RecCard from '../explore/components/RecCard'
import { useSelector, useDispatch } from 'react-redux';

export const RecCardsGroup = (props) => {

    const [select, setSelect] = useState(0)
    let RecCardList = props.goals.map(g => <RecCard goal={g}/>)

    const renderSelect = () => {
        return (
            RecCardList.slice(0, (select*10)+10)
        )
    }

    return (
        <div className="RecGoalCards"
        style={
            {   marginLeft: "130px",
                width: '90%'
            }
        }>
            <Segment
            style={
                {boxShadow: "none", border: 'none', display: 'flex'}
                }>
                <Card.Group>
                {renderSelect()}
                </Card.Group>
            </Segment>
            <Button style={
                {marginLeft:'10px'}
            }
            className="ExpShowMore"
            disabled={(select > 0) ? true : false}
            onClick={()=>{setSelect(select+1)}}
            >Click for more recommendations!</Button>
            <Button style={
                {marginLeft:'10px'}
            }
            className="ExpShowLess"
            disabled={(select > 0) ? false : true}
            onClick={()=>{setSelect(select-1)}}
            >Hide recommendations</Button>
        </div>
    )
}
