import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { CreateSignupForm, CreateLoginForm } from './AuthForm'
import { Modal } from '../common/Modal/Modal'


const Auth = (props) => {
    // useSelector is equivalent to mapStateToProps
    const isAuthModalOpen = useSelector(state => state.modal.auth)
    // useState is equivalent to this.state
    const [authMode, setAuthMode] = useState(props.authMode)

    const form = authMode === 'signup' 
        ? CreateSignupForm()
        : CreateLoginForm()
    
    return (
        <Modal isOpen={isAuthModalOpen}>
            <div className="modal-container small-container modal-auth">
                <button onClick={() => setAuthMode('signup')}>Sign Up</button>
                <button onClick={() => setAuthMode('login')}>Log In</button>
                {/* <div>{authMode == AuthMode.signup ? 'Sign Up' : 'Log In'}</div> */}
                <div className="modal__body">
                   {form}
                </div>
            </div>
        </Modal>
    )
}

export default Auth