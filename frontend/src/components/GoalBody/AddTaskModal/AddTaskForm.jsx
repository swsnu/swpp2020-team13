import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Grid, Menu } from 'semantic-ui-react'
import { Form, Button, Segment } from 'semantic-ui-react'
import * as actionCreators from '../../../store/actions'
import { useDispatch } from 'react-redux'
import './AddTaskForm.css'
import Rating from '@material-ui/lab/Rating';
import DatePicker from "react-datepicker"
import moment from 'moment'

const AddTaskForm = (props) => {
    const { register, handleSubmit, watch, errors , reset} = useForm()
    const dispatch = useDispatch()
    const onSubmit = (data, e) => { // e: event
        // const deadline_date = moment((deadline + ' '+ 'OO:OO:OO'), 'YYYY-MM-DD HH:MM:SS')     // as deadline is set as Form.Input instead of datepicker
        // console.log("type of deadline", deadline_date)
        // console.log(title, day_of_week, deadline, importance)
        const dataForm = new FormData()
        dataForm.append("title", title)
        dataForm.append("goal_id", props.goal_id)
        dataForm.append("day_of_week", day_of_week)        
        dataForm.append("deadline", deadline_unix)
        console.log("DEBUG: deadline in default", deadline)
        dataForm.append("importance", importance)
        dispatch(actionCreators.addTask(dataForm))
        reset()
    }   

    const onError = (errors, e) => console.log(errors, e);
    watch() // watchAllFields

    const options = [
        { key: 'm', text: 'Monday', value: 'MONDAY' },
        { key: 't', text: 'Tuesday', value: 'TUESDAY ' },
        { key: 'w', text: 'Wednesday', value: 'WEDNESDAY' },
        { key: 'th', text: 'Thursday', value: 'THURSDAY' },
        { key: 'f', text: 'Friday', value: 'FRIDAY' },
        { key: 's', text: 'Saturday', value: 'SATURDAY' },
        { key: 'su', text: 'Sunday', value: 'SUNDAY' },
      ]
    const today = new Date()
    const [importance, setImportance] = React.useState(2)
    const [day_of_week, setDayOfWeek] = React.useState([])
    const [title, setTitle] = React.useState("")
    const [deadline, setDeadline] = React.useState("")
    const [deadline_unix, setDeadlineUnix] = React.useState()

    const reg_deadline = new RegExp('^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$')

    const setDeadlineString = (string) => {
        setDeadline(string)
        const deadline_date = moment(string, "YYYY-MM-DD").format()
        setDeadlineUnix(moment(deadline_date).unix())
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Segment className="AddTaskForm" id="AddTaskFormSegment">
                <h3>&nbsp; Add Task</h3>
                <Form.Group widths='equal'>
                    <Form.Input label='Title' placeholder='Enter task title' onChange={(e,data)=> setTitle(data.value)} id="AddTaskFormTitle"/>
                    </Form.Group>
                        <Form.Group>
                            <Form.Select
                                multiple selection
                                label='Day of Week'
                                id="AddTaskFormDayofWeek"
                                options={options}
                                onChange={(e,data)=>setDayOfWeek(data.value)}
                                placeholder='Day of Week'
                            />
                            <Form.Input label='Deadline' 
                            placeholder='Deadline'
                            id="AddTaskFormDeadline"
                            disabled={(day_of_week.length == 0) ? true : false}
                            onChange={(e,data)=>setDeadlineString(data.value)}
                            error={reg_deadline.test(deadline) ? false : {content: "Enter date in YYYY-MM-DD format!"}}
                            />
                            {/* <DatePicker style={{ width: "150px" }} dateformat={"YYYY-MM-DD"} selected={deadline} onChange={(date)=>{setDeadline(date)}} /> */}                        </Form.Group>
                    <Form.Group inline>
                    <label>Importance</label>
                        <Rating
                        name="simple-controlled"
                        size="large"
                        id="AddTaskFormImportance"
                        value={importance}
                        onChange={(event, newValue) => {
                            setImportance(newValue);
                        }} 
                        />
                    </Form.Group>
                    <Form.Button className="AddTaskSubmitButton">Submit</Form.Button>                    
                </Segment>
        </Form>
    )
}

export default AddTaskForm