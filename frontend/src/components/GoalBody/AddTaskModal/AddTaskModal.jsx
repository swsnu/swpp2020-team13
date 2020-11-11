import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './AddTaskModal.css'
import { Modal } from '../../common/Modal/Modal'
import { Segment, Button, ButtonGroup } from 'semantic-ui-react'
import AddTaskForm from './AddTaskForm'

const AddTaskModal = (props) => {
    const isAddTaskModalOpen = useSelector(state => state.modal.addTask)
    return (
        <Segment className="SegmentAddTask">
        <Modal isOpen={isAddTaskModalOpen} className="SegmentAddTask">
            <div className="modal-container small-container modal-addTask">
                <div className="modal__body">
                   <AddTaskForm goal_id={props.goal_id}/>
                </div>
            </div>
        </Modal>
        </Segment>
    )
}

export default AddTaskModal 