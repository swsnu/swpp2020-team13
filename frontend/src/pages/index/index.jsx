import React from 'react'
import { connect } from 'react-redux'

import Auth from '../../components/Auth/Auth'
import { openAuthModal } from '../../store/actions'
import history from '../../history'

class HomePage extends React.Component {

    state = {
        authMode: 'signup'
    }

    // componentDidMount() {
    //     
    // }

    onClickSignup = () => {
        this.setState({ authMode: 'signup' })
        this.props.openAuthModal()
    }

    onClickLogin = () => {
        this.setState({ authMode: 'login' })
        this.props.openAuthModal()
    }
    
    render() {
        if (this.props.isUserLoggedIn) {
            // Redirect to main page
            history.push('/main')
            return <div>Should redirect to main page</div>
        }

        return (
            <div>
                <div>Home Page</div>
                <button onClick={this.onClickSignup}>SIGN UP</button>
                <button onClick={this.onClickSignup}>LOGIN</button>
                {this.props.isAuthModalOpen && <Auth authMode={this.state.authMode} />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.auth, 
        isAuthModalOpen: state.modal.auth 
    }
}

export default connect(mapStateToProps, { openAuthModal })(HomePage)