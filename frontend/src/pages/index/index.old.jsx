import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Auth from '../../components/Auth/Auth'

import { openAuthModal } from '../../store/actions'

const HomePage = () => {
    const isUserLoggedIn = useSelector(state => state.auth.key)
    const isAuthModalOpen = useSelector(state => state.modal.auth)

    const [authMode, setAuthMode] = useState('signup')
    const dispatch = useDispatch()

    if (isUserLoggedIn) {
        // Redirect to main page
        return <div>Should redirect to main page</div>
    }

    const onClickSignup = () => {
        setAuthMode('signup')
        dispatch(openAuthModal())
    }

    const onClickLogin = () => {
        setAuthMode('login')
        dispatch(openAuthModal())
    }
    
    return (
        <div>
            <div>Home Page</div>
            <button onClick={onClickSignup}>SIGN UP</button>
            <button onClick={onClickSignup}>LOGIN</button>
            {isAuthModalOpen && <Auth authMode={authMode} />}
        </div>
    )
}

export default HomePage