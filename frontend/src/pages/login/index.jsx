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
            <Form center={'true'} aligned={'true'} className="FormLogin">
            <Segment className="Segment">
                <Grid columns={2} className="grid" divided='vertically' style={
                    {marginLeft: '10px'}
                }>
                <Grid.Column>
                <h2 className="title">Goaling Ball</h2>
                <h3 className="subtitle" style={
                    {
                        fontSize: '17px'
                    }
                }>Your goal management service.</h3>
                </Grid.Column>
                <Grid.Column>
                <ButtonGroup className="ButtonGroup">
                <Button onClick={this.onClickSignup} className="Button" id="ButtonSignup">SIGN UP</Button >
                {/* <Button.Or /> */}
                <Button onClick={this.onClickLogin} className="Button" id="ButtonLogin">LOGIN</Button>
                </ButtonGroup>
                </Grid.Column>
                </Grid>
                {this.props.isAuthModalOpen && <Auth authMode={this.state.authMode} />}
                {console.log("DEBUG: ", this.props.isAuthModalOpen)}
            </Segment>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.auth, 
        isAuthModalOpen: state.modal.authModal 
    }
}

export default connect(mapStateToProps, { openAuthModal })(HomePage)