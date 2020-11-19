import React, { Component, useRef } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker from "react-datepicker"
import LoadingOverlay from 'react-loading-overlay';

import MenuBar from '../../components/Menubar/MenuBarComponent'
import { withRouter } from 'react-router-dom'
import { Form , Button, Input, Icon, Progress, Segment, FormField, Dropdown, label, Grid, Container} from 'semantic-ui-react'

import "react-datepicker/dist/react-datepicker.css"
import { isThisSecond } from 'date-fns';
// import axios from 'axios'
// import * as actionCreators from '../../../store/actions'
import { editGoal } from '../../store/actions'
// import { isThisMonth } from 'date-fns/esm'
import './EditGoal.css'
import { es } from 'date-fns/locale';

// const mapStateToProps = state => {
//     return{
//         selectedGoal: state.goal.selectedGoal,
//         // taskList: state.task.tasks,
//     }
// }

class EditGoal extends Component {

    state = {
      title: "",
      file: null,
      fileName: "",
      upload: false,
      deadline: new Date(),
      startdate: new Date(),
      tags: [],
      tagOptions:[],
      isEditing: false,
    }

    renderDefaultDate() {
        const startdate = moment(this.props.selectedGoal.created_at).format("MM/DD/YYYY")
        const deadline = new Date(this.props.selectedGoal.deadline)
        this.setState({startdate: startdate, deadline: deadline})
    }

    renderDefaultTagOptions() {
        console.log("CALLED")
        const defaultTagOptions = []
        const defaultTag = []
        this.props.selectedGoal.tags.map((t)=>{
            defaultTagOptions.push({key: t, text: t, value: t})
            defaultTag.push(t)
        })
        this.setState({tagOptions: defaultTagOptions, tags: defaultTag})
        console.log("[DEBUG] tagOptions", this.state.tagOptions)
        console.log("[DEBUG] tags", this.state.tags)
    }


    componentWillMount() {
        this.renderDefaultTagOptions()
        // this.renderDefaultDate()
    }

    componentDidMount() {
        this.renderDefaultDate()
    }

    fileChange = e => {
        if(e.target.files){
        this.setState(
          { file: e.target.files[0], fileName: e.target.files[0].name, upload: true},
          () => { console.log( "File chosen --->", this.state.file, console.log("File name  --->", this.state.fileName))},
          )
        }
        else {
        //    this.setState({file: default_goal_pic})
           console.log(this.state.file)
           const imageUrl = URL.createObjectURL(this.state.file)
            console.log(imageUrl)
        }
        
    }

    renderTitle() {
        return (
            <Form.Field>
                <label>Goal Title</label>
                <Input placeholder='Enter Title Here' 
                defaultValue={this.props.selectedGoal.title}
                onChange={(e)=>this.setState({title: e.target.value})}></Input>
            </Form.Field>
        )
    }

    renderPhoto() {
        const { statusCode } = this.state;
        return (
            <Segment>
            <Form.Field>
                <label id="PhotoInput">Add Goal Photo</label>
            <Button as="label" htmlFor="file" type="button" animated="fade">
              <Button.Content visible>
                <Icon name="file" />
              </Button.Content>
              <Button.Content hidden>Choose a File</Button.Content>
            </Button>
            <input type="file" id="file" hidden onChange={this.fileChange}/>
            <Form.Input fluid label="Photo Chosen " placeholder="Upload to edit goal photo" readOnly
              value={this.state.fileName}
            />
            <Button style={{ marginTop: "7px" }} onClick={this.fileChange} id="UploadPhotoButton"> Upload </Button>
          </Form.Field>
          </Segment>
        )
    }

    selectDeadline(date) {
        this.setState({deadline:date})
    }

    formatDate(d) {
        // console.log(date.toString('MM/dd/yyyy'))
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; //Months are zero based
        var curr_year = d.getFullYear();
        return curr_month + "/" + curr_date + "/" + curr_year
    }

    renderDeadline() {
        return(
            <Segment>
                <FormField>
                    <label>Select Goal Deadline</label>
                    <Grid columns='three' textAlign='center' className="DeadlineGrid">
                    <Grid.Column width={5}>
                    <Input id="todayDate" style={{ width: "175px" }} readOnly value={this.state.startdate}></Input>
                    </Grid.Column >
                    <Grid.Column width={1}><Container><h5>to</h5></Container></Grid.Column>
                    <Grid.Column  width={5}>
                    <DatePicker style={{ width: "150px" }} dateformat={"YYYY-MM-DD"} selected={this.state.deadline} onChange={(date)=>{this.selectDeadline(date)}} />
                    </Grid.Column>
                    </Grid>
                </FormField>
            </Segment>
        )
    }

    onTagsChanged(tags) {
        this.setState({tags: tags})
    }

    addTagOptions(e,data) {
        const tagOptions = this.state.tagOptions
        tagOptions.push({key: data.value, text: data.value, value: data.value})
        this.setState({tagOptions:tagOptions})
    }

    setTag(data) {
        this.onTagsChanged(data.value)
    }

    renderTag() {
        return(
            <FormField>
                <label>Add Tags</label>
                <Dropdown search selection 
                    clearable multiple allowAdditions fluid 
                    defaultValue={this.state.tags}
                    onAddItem={(e,data) => this.addTagOptions(e, data)} 
                    onChange={(e,data)=>this.setTag(data)}
                    options={this.state.tagOptions}
                />
            </FormField>
        )
    }


    onClickHandler() {
        // e.preventDefault()
        let data = new FormData()
        data.append("title", this.state.title)
        let deadline = moment(this.state.deadline).startOf('day').unix() + (24*60*60 - 1)
        // console.log("Modified deadline: ", moment.unix(deadline).format('MMMM Do YYYY, h:mm:ss a'))
        data.append("deadline", deadline)
        data.append("tags", JSON.stringify(this.state.tags))

        let key = ''
        if (this.props.selectedGoal.photo != '') {
            const s3prefix = 'https://goalingball-test.s3.amazonaws.com/'
            const re = new RegExp(s3prefix)
            key = this.props.selectedGoal.photo.replace(re, '')
        }
        console.log("[DEBUG] EditGoalComponent key: ", key)

        this.props.editGoal(this.props.selectedGoal.id, data, this.state.file, key)
        // this.setState({ isEditing: true })
    }

    render(){
        console.log("selected goal: ", this.props.selectedGoal)
        return(
            <LoadingOverlay
                active={this.state.isEditing}
                spinner
                text='Editing a new goal...'
            >
            {/* <div className='menubar'>
                <MenuBar/>
            </div> */}
            <div>
                <Form className="EditGoalForm">
                {this.renderTitle()}
                {this.renderPhoto()}
                {this.renderDeadline()}
                {this.renderTag()}
                <Button floated="right">Go Back</Button>
                <Button onClick={()=>this.onClickHandler()} floated="right">Confirm</Button>
                </Form>
            </div>
            </LoadingOverlay>
        )
    }

}

export default connect(null, { editGoal })(EditGoal)
