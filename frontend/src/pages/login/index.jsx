import React from 'react'
import { connect } from 'react-redux'
import './login.css'
import Auth from '../../components/Auth/Auth'
import { openAuthModal } from '../../store/actions'
import history from '../../history'
import { Segment, Menu, Grid, Container, Form, Button, ButtonGroup} from 'semantic-ui-react'

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
            console.log("[DEBUG] isUserLoggedIn: ", this.props.isUserLoggedIn)
            console.log("[DEBUG] The user is already logged in. Redirect...")
            history.push('/main')
            return <div>Should redirect to main page</div>
        }

        return (
            <Form center aligned className="FormLogin">
            <Segment className="Segment">
                <Grid columns={2} className="grid" divided='vertically'>
                <Grid.Column>
                <h2 className="title">Sign up and Login</h2>
                </Grid.Column>
                <Grid.Column>
                <ButtonGroup className="ButtonGroup">
                <Button onClick={this.onClickSignup} className="Button">SIGN UP</Button >
                {/* <Button.Or /> */}
                <Button onClick={this.onClickLogin} className="Button">LOGIN</Button>
                </ButtonGroup>
                </Grid.Column>
                </Grid>
                {this.props.isAuthModalOpen && <Auth authMode={this.state.authMode} />}
            </Segment>
            </Form>
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