import React, { Component } from 'react'
import { Button, Divider, Segment, Form, Input, Icon, FormField, Dropdown, TextArea } from 'semantic-ui-react'
import MenuBar from "../../../components/Menubar/MenuBarComponent"
import "./EditProfile.css"

class EditProfile extends Component {
    editPhoto() {
        return (
            <Segment>
                <Form>
                    <Form.Field>
                        <label>Edit Photo</label>
                        <Button animated="fade">
                            <Button.Content visible>
                                <Icon name="file" />
                            </Button.Content>
                            <Button.Content hidden>Choose a File</Button.Content>
                        </Button>

                        <Form.Input fluid label="Photo Chosen " placeholder="Use the above bar to browse your file system" readOnly />
                        <Button id="editPhotoButton"> Upload </Button>
                    </Form.Field>
                </Form>
            </Segment>
        )
    }

    editName() {
        return (
            <Segment>
                <Form>
                    <Form.Field>
                        <label>Edit Name</label>
                        <Form.Input fluid placeholder='Name' />
                        <Button id="editNameButton"> Save </Button>
                    </Form.Field>
                </Form>
            </Segment>
        )
    }

    editBio() {
        return (
            <Segment>
                <Form>
                    <Form.Field>
                        <label>Edit Biography</label>
                        <FormField control='textarea' placeholder='Tell us more about you...' />
                        <Button id="editBioButton"> Save </Button>
                    </Form.Field>
                </Form>
            </Segment>
        )
    }

    editTag() {
        return(
            <Segment>
                <Form>
                    <FormField>
                        <label>Edit Tags</label>
                        <Dropdown placeholder="add goal tags here" search selection clearable multiple allowAdditions fluid />
                    </FormField>
                </Form>
            </Segment>
        )
    }

    render() {
        return (
            <div class='editProfilePage'>
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
                <Button id='backButton'>Back</Button>
                <Button id='confirmButton' positive>Confirm</Button>
            </div>
        )
    }
}

export default EditProfile