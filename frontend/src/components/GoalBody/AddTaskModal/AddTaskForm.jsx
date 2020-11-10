import React from 'react'
import { useForm } from 'react-hook-form'
import { Grid, Menu } from 'semantic-ui-react'
import { Form, Button, Segment } from 'semantic-ui-react'
import * as actionCreators from '../../../store/actions'
import { useDispatch } from 'react-redux'
import './AddTaskForm.css'
const AddTaskForm = (props) => {
    const { register, handleSubmit, watch, errors } = useForm()
    
    const onSubmit =(data, e) => { // e: event
        console.log(data)
    }


    const onError = (errors, e) => console.log(errors, e);
    watch() // watchAllFields

    const options = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'o', text: 'Other', value: 'other' },
      ]

    return (
        <Form>
            <Segment className="AddTaskForm">
                <h3>&nbsp; Add Task</h3>
                <Form.Group widths='equal'>
                    <Form.Input label='Title' placeholder='Enter task title' />
                    </Form.Group>
                    <Form.Group>
                    <Form.Select
                        label='Day of Week'
                        options={options}
                        placeholder='Day of Week'
                    />
                    <Form.Input label='Deadline' placeholder='Last name' />
                    </Form.Group>
                    <Form.Group inline>
                    <label>Importance</label>
                    </Form.Group>
                    <Form.Button className="AddTaskSubmitButton">Submit</Form.Button>                    
                </Segment>
        </Form>
    )
}

export default AddTaskForm