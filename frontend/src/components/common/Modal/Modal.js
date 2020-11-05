import React from 'react'
import ReactModal from 'react-modal'
import { useDispatch } from 'react-redux'

import { closeModal } from '../../../store/actions'

export const Modal = (props) => {
    ReactModal.setAppElement('#root')

    const { children } = props

    const dispatch = useDispatch()

    return (
        <ReactModal
            {...props}
        >
            {children}
            <button
                className="modal__close-btn"
                onClick={() => dispatch(closeModal())}
            >
                close
            </button>
        </ReactModal>
    )
}

