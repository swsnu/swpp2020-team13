import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { CreateSignupForm, CreateLoginForm } from './AuthForm'
import { Modal } from '../common/Modal/Modal'
import { Segment, Button, ButtonGroup } from 'semantic-ui-react'
import './Auth.css'

const Auth = (props) => {
    // useSelector is equivalent to mapStateToProps
    const isAuthModalOpen = useSelector(state => state.modal.auth)
    // useState is equivalent to this.state
    const [authMode, setAuthMode] = useState(props.authMode)

    const form = authMode === 'signup' 
        ? CreateSignupForm()
        : CreateLoginForm()
    
    return (
        <Segment className="SegmentModal">
        <Modal isOpen={isAuthModalOpen}>
            <div className="modal-container small-container modal-auth">
                <ButtonGroup className="ButtonGroupModal" floated="right">
                <Button onClick={() => setAuthMode('signup')}>Sign Up</Button>
                <Button onClick={() => setAuthMode('login')}>Log In</Button>
                </ButtonGroup>
                {/* <div>{authMode == AuthMode.signup ? 'Sign Up' : 'Log In'}</div> */}
                <br></br>
                <div className="modal__body">
                   {form}
                </div>
            </div>
        </Modal>
        </Segment>
    )
}

export default Auth