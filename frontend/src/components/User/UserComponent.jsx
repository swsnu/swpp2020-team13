import React from 'react'
import { Image, Button, Item, Segment, Divider, Header, Card, Icon } from 'semantic-ui-react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import './User.css'

const UserComponent = (props) => {
    return (
        <div>
            <MenuBar/>
            {/*user photo*/}
            <h1>This is user profile page</h1>
                <Button>Edit Profile</Button>
                <Divider section />

                <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' size='medium' rounded bordered />

            {/*user name, biography*/}
            <Segment>
                <Header as='h3'>Name: </Header>
                <Divider section />
                <Header as='h3'>Biography: </Header>
            </Segment>

            {/*tags, statistics*/}
            <br></br>
            <Divider />

            {/*goal history*/}
            <br></br>
                <Card>
                    <Image src='https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/how_to_keep_liver_healthy_slideshow/1800x1200_how_to_keep_liver_healthy_slideshow.jpg' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>Eat more vegetables</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in 2015</span>
                        </Card.Meta>
                        <Card.Description>
                            Matthew is a musician living in Nashville.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            22 Friends
                        </a>
                    </Card.Content>
                </Card>

        </div>
    )
}

export default UserComponent;