import React from 'react'
import { Button, Segment, List, Icon, Grid } from 'semantic-ui-react'
import Rating from '@material-ui/lab/Rating'
export const TaskInfo = (props) => {
    return (
        <Segment
        style={
            {boxShadow: "none", margin: '0px', border: 'none'}
            }>
            <Grid columns='2'
            style={
                {padding: '4px'}
            }
            >
                <Grid.Column width="2"
                style={
                    {padding: '0px', alignItems: 'center'}
                }>
                    <Button icon style={
                        {backgroundColor: '#FFFFFF'}
                    }>
                    <Icon name='check circle outline' size="large" style={
                        {paddingTop: '15px', paddingLeft: '20px', color: "#807e7e90"}
                    }>
                    </Icon>
                    </Button>
                </Grid.Column>
                <Grid.Column width="14"
                style={
                    {padding: '4px'}
                }>
                    <List className="TaskInfoTitleList">
                        <List.Item className="TaskInfoListItem">
                            <List.Content className="TaskInfoListTitle">
                                <List.Header className="TaskInfoListTitleHeader"
                                style={
                                    {fontSize: '19px', paddingBottom: '15px', paddingTop: '0px',}
                                }
                                >    
                                    task.title&nbsp;&nbsp;&nbsp;
                                    <Rating className="TaskInfoListRating"
                                            name="simple-controlled"
                                            size="small"
                                            id="AddTaskFormImportance"
                                            value='5'
                                            readOnly
                                        />
                                </List.Header>
                                <p style={
                                    {fontSize: '14px', color: "#807d7d"}
                                }>
                                From Dec.12 2020 Until Dec 20. 2020
                                    <br></br>
                                    On every Monday
                                </p>
                            </List.Content>
                        </List.Item>
                    </List>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}