import React from 'react'
import { Image, Button, Item, Segment, Divider, Header, Card, Icon, Form, Grid, Container, Placeholder } from 'semantic-ui-react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import "./User.css"

const UserComponent = (props) => {
    return (
        <div class='profilePage'>
            <MenuBar/>
            {/* header */}
            <h1>This is user profile page</h1>
            <Button id='editButton' floated='right'>Edit Profile</Button>
            <br></br>
            <Divider section />

            {/* body */}
            <Segment.Group class='body'>
                <Segment.Group class='userInfo' horizontal>
                    <Segment class='profile'>
                        {/* User photo */}
                        <Image id='photo' src='https://image.bugsm.co.kr/artist/images/1000/800491/80049126.jpg' size='medium' rounded bordered />
                        {/*<Image id='photo' src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' size='medium' rounded bordered />*/}
                        
                        {/* Name & Biography */}
                        <Segment.Group>
                            <Segment>
                                <Container>
                                    <Header as='h2'>Name: </Header>
                                    <p>Gildong Hong</p>

                                    <Divider section />

                                    <Header as='h2'>Biography: </Header>
                                    <p>Hello my name is gildong hong i major in computer science.
                                        jiwon is my best friend Hello my name is gildong hong i major in computer science.
                                        jiwon is my best friendHello my name is gildong hong i major in computer science.
                                        jiwon is my best friendHello my name is gildong hong i major in computer science.
                                        jiwon is my best friendHello my name is gildong hong i major in computer science.
                                        jiwon is my best friend</p>
                                </Container>
                            </Segment>
                        </Segment.Group>
                    </Segment>

                    {/* Tags & Statistics */}
                    <Segment class='tagStat'>
                        <Segment>
                                <Container>
                                    <Header as='h2'>Tags</Header>
                                    <p>Gildong Hong</p>

                                    <Divider section />

                                    <Header as='h2'>Statistics</Header>
                                    <p>fjijflskfjlsjflf</p>
                                </Container>
                            </Segment>
                    </Segment>
                </Segment.Group>

                <Divider section />

                {/* Simple Goal History */}
                <Segment>
                    <Card.Group>
                        <Card id='goalCard'>
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
                        <Card id='goalCard'>
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
                    </Card.Group>
                </Segment>
            </Segment.Group>
        </div>
    )
}

export default UserComponent;