import React, { Component } from 'react'
import { Header, Button, Divider, Segment, Form, Input, Icon, FormField, Dropdown, TextArea } from 'semantic-ui-react'
import MenuBar from "../../../components/Menubar/MenuBarComponent"
import "./EditProfile.css"

class EditProfile extends Component {
    editPhoto() {
        return (
            <Segment>
                <Form>
                    <Form.Field>
                        <Header as='h3'>Edit Photo</Header>
                        <Button id='fileIconButton' as='label' animated="fade">
                            <Button.Content visible>
                                <Icon name="file" />
                            </Button.Content>
                            <Button.Content hidden>Choose a File</Button.Content>
                        </Button>

                        <Form.Input fluid label="Photo Chosen" placeholder="Use the above bar to browse your file system" readOnly />
                        <Button floated='right'> Upload </Button>
                    </Form.Field>
                </Form>
                <br></br><br></br>
            </Segment>
        )
    }

    editName() {
        return (
            <Segment>
                <Form>
                    <Form.Field>
                        <Header as='h3'>Edit Name</Header>
                        <Form.Input fluid placeholder='Name' />
                        <Button floated='right'> Save </Button>
                    </Form.Field>
                </Form>
                <br></br><br></br>
            </Segment>
        )
    }

    editBio() {
        return (
            <Segment>
                <Form>
                    <Form.Field>
                        <Header as='h3'>Edit Biography</Header>
                        <FormField control='textarea' placeholder='Tell us more about you...' />
                        <Button floated='right'> Save </Button>
                    </Form.Field>
                </Form>
                <br></br><br></br>
            </Segment>
        )
    }

    editTag() {
        return(
            <Segment>
                <Form>
                    <FormField>
                        <Header as='h3'>Edit Tags</Header>
                        <Dropdown placeholder="add goal tags here" search selection clearable multiple allowAdditions fluid />
                        <Button id="editTagButton" floated='right'> Save </Button>
                    </FormField>
                </Form>
                <br></br><br></br><br></br>
            </Segment>
        )
    }

    render() {
        return (
            <div className='editProfilePage'>
                <MenuBar/>

                {/* header */}
                <h1>This is user profile edit page</h1>
                <Divider section />

                {/* body */}
                <Form.Group widths='equal'>
                    {/* Photo */}
                    {this.editPhoto()}

                    {/* Name & Biography */}
                    {this.editName()}
                    {this.editBio()}

                    {/* Interested Tags */}
                    {this.editTag()}
                </Form.Group>

                <br></br><br></br>
                <Button id='confirmButton' positive floated='right'>Confirm</Button>
                <Button id='backButton' floated='right'>Back</Button>
            </div>
        )
    }
}

export default EditProfile