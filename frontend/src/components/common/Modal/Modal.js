import React from 'react'
import ReactModal from 'react-modal'
import { useDispatch } from 'react-redux'

import { closeModal } from '../../../store/actions'
import {Button} from 'semantic-ui-react'
import './Modal.css'
export const Modal = (props) => {
    ReactModal.setAppElement('#root')

    const { children } = props

    const dispatch = useDispatch()

    return (
        <ReactModal id="reactModal"
            {...props}
            style={{
                overlay: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(230, 230, 230, 0.5)'
                }}}
        >
            {children}
            <Button
                className="modal__close-btn"
                onClick={() => dispatch(closeModal())}
                floated="right"
                id="closeButton"
            >
                close
            </Button>
        </ReactModal>
    )
}

