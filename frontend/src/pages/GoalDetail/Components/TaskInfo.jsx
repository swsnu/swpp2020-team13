import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Segment, List, Icon, Grid } from 'semantic-ui-react'
import Rating from '@material-ui/lab/Rating'
import moment from 'moment'
import './TaskInfo.css'

export const TaskInfo = (props) => {

    const [select, setSelect] = useState(false)
    const dispatch = useDispatch()

    const deadlineDate = (deadline) => {
        return moment.unix(deadline).format('MMM Do YYYY')
        // return moment.unix(deadline).format('LL')
    }

    const startAtDate = (start_at) => {
        return moment.unix(start_at).format('MMM Do YYYY')
        // return moment.unix(deadline).format('LL')
    }

    const renderDeadlineString = (day_of_week, start_at, deadline) => {
        let str = "From "
        str = str +  startAtDate(start_at) + ", Until " + deadlineDate(deadline)
        if(day_of_week.length !== 0) {
            var daystr = "On every "
            for (var d of day_of_week) {
                d = d.toLowerCase()
                d = (d.charAt(0).toUpperCase() + d.slice(1)).slice(0,3)
                daystr = daystr + d + ","+ " "
            }
            daystr = daystr.slice(0, daystr.length-2)
            return (
            <p style={
                {fontSize: '14px', color: "#807d7d"}
            }>
                {str}<br></br>{daystr}
            </p>
            )
        }
        return (
            <p style={
                {fontSize: '14px', color: "#807d7d"}
            }>{str}</p>
        )
    }

   const onSelectTaskHandler = () => {
        setSelect(true)
        props.onSelect(props.task.id)
   }

    return (
        <Segment
        style={
            {boxShadow: "none", margin: '0px', border: 'none'}
            }>
            <Grid columns='2'
            style={
                {padding: '4px'}
            }
            >
                <Grid.Column width="2"
                style={
                    {padding: '0px', alignItems: 'center'}
                }>
                    <Button icon style={
                        {backgroundColor: '#FFFFFF'}
                    }
                    onClick={onSelectTaskHandler}
                    >
                    <Icon name='check circle outline' size="large" style={
                        {paddingTop: '11px', paddingLeft: '20px'}
                    }
                    // className={`TaskSelect${select && 'True'}`}
                    >
                    </Icon>
                    </Button>
                </Grid.Column>
                <Grid.Column width="14"
                style={
                    {padding: '4px'}
                }>
                    <List className="TaskInfoTitleList">
                        <List.Item className="TaskInfoListItem">
                            <List.Content className="TaskInfoListTitle">
                                <List.Header className="TaskInfoListTitleHeader"
                                style={
                                    {fontSize: '16px', paddingBottom: '12px', paddingTop: '0px',}
                                }
                                >    
                                    {props.task.title}&nbsp;&nbsp;&nbsp;
                                    <Rating className="TaskInfoListRating"
                                            name="simple-controlled"
                                            size="small"
                                            id="AddTaskFormImportance"
                                            value={props.task.importance}
                                            readOnly
                                        />
                                </List.Header>
                                {renderDeadlineString(props.task.day_of_week, props.task.start_at, props.task.deadline)}
                            </List.Content>
                        </List.Item>
                    </List>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}