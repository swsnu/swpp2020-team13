import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './AddAccModal.css'
import { Modal } from '../common/Modal/Modal'
import { Segment, Button, ButtonGroup } from 'semantic-ui-react'
import AddAccForm from './AddAccForm'

const AddAccModal = (props) => {
    const isAddAccModalOpen = useSelector(state => state.modal.addAcc)
    return (
        <Segment className="SegmentAddAcc" id="SegmentAddAccModal">
        <Modal isOpen={isAddAccModalOpen} className="SegmentAddAcc">
            <div className="modal-container small-container modal-addAcc">
                <div className="modal__body">
                   <AddAccForm />
                </div>
            </div>
        </Modal>
        </Segment>
    )
}

export default AddAccModal 