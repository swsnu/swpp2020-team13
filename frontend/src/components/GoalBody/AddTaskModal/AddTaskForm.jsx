import React from 'react'
import { useForm } from 'react-hook-form'
import { Menu } from 'semantic-ui-react'
import { Form, Button, Segment } from 'semantic-ui-react'
import * as actionCreators from '../../../store/actions'
import { useDispatch } from 'react-redux'

const AddTaskForm = (props) => {
    return (
        <Form >
            <Segment>
            <h2>Add Task</h2>
            </Segment>
        </Form>
    )
}

export default AddTaskForm