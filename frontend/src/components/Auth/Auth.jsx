import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { CreateSignupForm, CreateLoginForm } from './AuthForm'
import { Modal } from '../common/Modal/Modal'
import { Segment, Button, ButtonGroup } from 'semantic-ui-react'

const Auth = (props) => {
    // useSelector is equivalent to mapStateToProps
    const isAuthModalOpen = useSelector(state => state.modal.auth)
    // useState is equivalent to this.state
    const [authMode, setAuthMode] = useState(props.authMode)

    const form = authMode === 'signup' 
        ? CreateSignupForm()
        : CreateLoginForm()
    
    return (
        <Segment>
        <Modal isOpen={isAuthModalOpen}>
            <div className="modal-container small-container modal-auth">
                <ButtonGroup>
                <Button onClick={() => setAuthMode('signup')}>Sign Up</Button>
                <Button onClick={() => setAuthMode('login')}>Log In</Button>
                </ButtonGroup>
                {/* <div>{authMode == AuthMode.signup ? 'Sign Up' : 'Log In'}</div> */}
                <div className="modal__body">
                   {form}
                </div>
            </div>
        </Modal>
        </Segment>
    )
}

export default Auth