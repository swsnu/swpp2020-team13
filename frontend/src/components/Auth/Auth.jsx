import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { CreateAuthForm } from './AuthForm'
import { Modal } from '../common/Modal/Modal'
import { Segment, Button, ButtonGroup } from 'semantic-ui-react'
import './Auth.css'

const Auth = (props) => {
    // useSelector is equivalent to mapStateToProps
    const isAuthModalOpen = useSelector(state => state.modal.authModal)
    // useState is equivalent to this.state
    const [authMode, setAuthMode] = useState(props.authMode)
    
    const form = CreateAuthForm(authMode)
    
    return (
        <Segment className="SegmentModal" >
        <Modal isOpen={isAuthModalOpen}>
            <div className="modal-container small-container modal-auth" id="Auth">
                <ButtonGroup className="ButtonGroupModal" floated="right">
                <Button onClick={() => setAuthMode('signup')} id="AuthSignup">Sign Up</Button>
                <Button onClick={() => setAuthMode('login')} id="AuthLogin">Log In</Button>
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