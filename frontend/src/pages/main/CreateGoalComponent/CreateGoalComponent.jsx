import React, { Component, useRef } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker from "react-datepicker"
import LoadingOverlay from 'react-loading-overlay';

import MenuBar from '../../../components/Menubar/MenuBarComponent'
import { withRouter } from 'react-router-dom'
import { Form , Button, Input, Icon, Progress, Segment, FormField, Dropdown, label, Grid, Container} from 'semantic-ui-react'
import './CreateGoal.css'

import history from '../../../history'
// import "react-datepicker/dist/react-datepicker.css"
import * as actionCreators from '../../../store/actions'
import { addGoal } from '../../../store/actions'
import { DateInput} from 'semantic-ui-calendar-react'
// import { isThisMonth } from 'date-fns/esm'


class CreateGoal extends Component {

    state = {
      title: "",
      file: null,
      fileName: "",
      upload: false,
      deadline: new Date(),
      start_at: new Date(),
      tags: [],
      tagOptions:[],
      isCreating: false,
      preview: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'
    }

    fileChange = e => {
        if(e.target.files){
        this.setState(
          { file: e.target.files[0], fileName: e.target.files[0].name, upload: true},
          () => { console.log( "File chosen --->", this.state.file, console.log("File name  --->", this.state.fileName))},
          )
          this.setState({ preview:  URL.createObjectURL( e.target.files[0])});
        }
        
        else {
        }
        
    }

    renderTitle() {
        return (
            <Form.Field>
                <label>Goal Title</label>
                <Input placeholder='Enter Title Here' 
                className="CreateGoalTitle"
                onChange={(e)=>this.setState({title: e.target.value})}></Input>
            </Form.Field>
        )
    }

    renderPhoto() {
        const { statusCode } = this.state;
        return (
            <Segment>
                <Grid columns='2'>
                    <Grid.Column width="11">
                        <Form.Field style={
                            {
                                marginTop: '20px'
                            }
                        }>
                                <label id="PhotoInput">Add Goal Photo</label>
                            <Button as="label" htmlFor="file" type="button" animated="fade">
                            <Button.Content visible>
                                <Icon name="file" />
                            </Button.Content>
                            <Button.Content hidden>Choose a File</Button.Content>
                            </Button>
                            <input type="file" id="file" className="GoalPhoto" hidden onChange={this.fileChange}/>
                            <Form.Input fluid label="Photo Chosen " placeholder="Use the above bar to browse your file system" readOnly
                            value={this.state.fileName}
                            />
                            {/* <Button style={{ marginTop: "7px" }} onClick={this.fileChange} id="UploadPhotoButton"> Upload </Button> */}
                        </Form.Field>

                    </Grid.Column>
                    <Grid.Column width="5">
                    {this.fileRender()}
                    </Grid.Column>
                </Grid>
          </Segment>
        )
    }

    // selectDeadline(date) {
    //     this.setState({deadline:date})
    // }

    // formatDate(d) {
    //     // console.log(date.toString('MM/dd/yyyy'))
    //     var curr_date = d.getDate();
    //     var curr_month = d.getMonth() + 1; //Months are zero based
    //     var curr_year = d.getFullYear();
    //     return curr_month + "/" + curr_date + "/" + curr_year
    // }

    fileRender() {
        return(

                    <Segment style={
                        {
                            boxShadow: 'none',
                            alignItems: 'center'
                            
                        }
                    }
                    textAlign='center'>
                    <img id="image" src={this.state.preview} style={
                        {
                            maxWidth: '150px', 
                            maxHeight: '180px',
                            minWidth: '150px',
                            minHeight: '150px',                      
                        }
                    }></img>
                    </Segment>

        )
    }


    handleChangeStart = (event, {name, value}) => {
         this.setState({ [name]: value });
      }

    handleChangeDeadline = (event, {name, value}) => {
        this.setState({ [name]: value });
     }

    renderDeadline() {
        return(
            <Segment>
                <FormField>
                    {/* <label>Select Goal Deadline</label> */}
                    <Grid columns='two' textAlign='center' className="DeadlineGrid">
                    <Grid.Column width={5}>
                    {/* <Input id="todayDate" style={{ width: "175px" }} readOnly value={this.formatDate(this.state.startdate)}></Input> */}
                    <DateInput
                                id="GoalFormStart"
                                label='Starting From'
                                name="start_at"
                                placeholder="Date"
                                value={moment(this.state.start_at).format('YYYY-MM-DD')}
                                iconPosition="left"
                                dateFormat="YYYY-MM-DD"
                                onChange={this.handleChangeStart}
                            />  
                    </Grid.Column >
                    {/* <Grid.Column width={1}><Container><h5>to</h5></Container></Grid.Column> */}
                    <Grid.Column  width={5}>
                    {/* <DatePicker style={{ width: "150px" }} dateformat={"YYYY-MM-DD"} selected={this.state.deadline} onChange={(date)=>{this.selectDeadline(date)}} /> */}
                    <DateInput
                                id="GoalFormDeadline"
                                label='Deadline'
                                name="deadline"
                                placeholder="Date"
                                value={moment(this.state.deadline).format('YYYY-MM-DD')}
                                iconPosition="left"
                                dateFormat="YYYY-MM-DD"
                                onChange={this.handleChangeDeadline}
                            />  
                    </Grid.Column>
                    </Grid>
                </FormField>
            </Segment>
        )
    }

    onTagsChanged(tags) {
        this.setState({tags: tags || []})
    }

    addTagOptions(e,data) {
        const tagOptions = this.state.tagOptions
        tagOptions.push({key: data.value, text: data.value, value: data.value})
        console.log(tagOptions)
        this.setState({tagOptions:tagOptions})
    }

    setTag(data) {
        this.onTagsChanged(data.value)
    }

    renderTag() {
        return(
            <FormField>
                <label>Add Tags</label>
                <Dropdown placeholder="add goal tags here. You should add a tag in order to add a goal" search selection 
                    clearable multiple allowAdditions fluid 
                    onAddItem={(e,data) => this.addTagOptions(e, data)} 
                    onChange={(e,data)=>this.setTag(data)}
                    options={this.state.tagOptions}
                    className="GoalDropDown"
                />
            </FormField>
        )
    }


    onClickHandler() {
        // e.preventDefault()
        // console.log(this.state.tags)
        let data = new FormData()
        data.append("title", this.state.title)
        let start_at = moment(this.state.start_at).startOf('day').unix()
        let deadline = moment(this.state.deadline).startOf('day').unix() + (24*60*60 - 1)
        console.log("Modified deadline: ", moment.unix(start_at).format('MMMM Do YYYY, h:mm:ss a'))
        data.append("start_at", start_at)
        data.append("deadline", deadline)

        // If you add more than one item to the same key, it makes a list.
        for (const tag of this.state.tags) {
            data.append("tags", tag)
        }
        console.log("Create goal data.get('tags'): ", data.get('tags'))

        this.props.addGoal(data, this.state.file)
        this.setState({ isCreating: true })
    }

    // confirmHandler = () => {
    //     formData = new FormData()
    //     data.append("title", this.state.file)
    //     data.append()
    //     data.append("tags")
    // }

    // sendRequestTest() {
    //     let data = new FormData()
    //     data.append("title", "title")
    //     data.append('photo', this.state.file)
    //     data.append("deadline", "2020-11-11 12:00:00")
    //     console.log(data.get('deadline'))

    //     axios.post('/api/v1/goal/', data, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //           },
    //     })
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err));
    // }

    render(){
        return(
            <div>
            <div className='menubar'>
                <MenuBar/>
            </div>
            <div style={
                {
                    marginLeft: '130px',
                    marginTop: '50px',
                    maxWidth: '700px',
                    marginRight: '10%',
                }
            }>
            <LoadingOverlay
                className="spinner"
                active={this.state.isCreating}
                spinner
                text='Creating a new goal...'
            >
                <h2 id="header">Add a Goal</h2>
                <Form id="FormCreateForm" className='FormCreate'>
                    {this.renderTitle()}
                    {this.renderPhoto()}
                    {/* {this.fileRender()} */}
                    {this.renderDeadline()}
                    {this.renderTag()}
                    <Button 
                        floated="right"
                        onClick={() => { history.push('/main') }}
                    >
                        Go Back
                    </Button>
                    <Button 
                        onClick={()=>this.onClickHandler()} 
                        // disabled={(this.state.tags.length == 0) ? true : false}
                        floated="right" className="GoalSubmitButton"
                    >
                        Confirm
                    </Button>
                </Form>
            </LoadingOverlay>
            </div>
            </div>
        )
    }

}



export default connect(null, { addGoal })(withRouter(CreateGoal))