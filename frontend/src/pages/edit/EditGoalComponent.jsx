import React, { Component, useRef } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import LoadingOverlay from 'react-loading-overlay';
import { DateInput} from 'semantic-ui-calendar-react'
import { Form , Button, Input, Icon, Progress, Segment, FormField, Dropdown, label, Grid, Container} from 'semantic-ui-react'

import "react-datepicker/dist/react-datepicker.css"
// import { isThisSecond } from 'date-fns';
import { editGoal } from '../../store/actions'
import './EditGoal.css'


class EditGoal extends Component {

    state = {
      title: "",
      file: null,
      fileName: "",
      upload: false,
      deadline: new Date(),
      start_at: new Date(),
      tags: [],
      tagOptions:[],
      isEditing: false,
    }

    renderDefaultDate() {
        const start_at = moment.unix(this.props.selectedGoal.start_at).format("YYYY-MM-DD")
        const deadline = moment.unix(this.props.selectedGoal.deadline).format("YYYY-MM-DD")
        this.setState({start_at: start_at, deadline: deadline})
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
        // this.setState({title: this.props.selectedGoal.title})
        // this.renderDefaultDate()
    }

    componentDidMount() {
        this.setState({title: this.props.selectedGoal.title})
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
        //    console.log(this.state.file)
        //    const imageUrl = URL.createObjectURL(this.state.file)
        //     console.log(imageUrl)
        }
        
    }

    renderTitle() {
        return (
            <Form.Field>
                <label>Goal Title</label>
                <Input placeholder='Enter Title Here' 
                defaultValue={this.props.selectedGoal.title}
                onChange={(e)=>this.setState({title: e.target.value})}
                id="EditGoalFormTitle"
                ></Input>
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
            <input type="file" id="file" className="EditGoalPhoto" hidden onChange={this.fileChange}/>
            <Form.Input fluid label="Photo Chosen " placeholder="Upload to edit goal photo" readOnly
              value={this.state.fileName}
            />
            <Button style={{ marginTop: "7px" }} onClick={this.fileChange} id="UploadPhotoButton"> Upload </Button>
          </Form.Field>
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
       this.setState({tags: tags})
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
               <Dropdown placeholder="add goal tags here" search selection 
                   clearable multiple allowAdditions fluid 
                   onAddItem={(e,data) => this.addTagOptions(e, data)} 
                   onChange={(e,data)=>this.setTag(data)}
                   options={this.state.tagOptions}
                   className="GoalDropDown"
               />
           </FormField>
       )
   }

    onTagsChanged(tags) {
        console.log("tag changing")
        this.setState({tags: tags})
        console.log(this.state.tags)
    }

    addTagOptions(e,data) {
        const tagOptions = this.state.tagOptions
        tagOptions.push({key: data.value, text: data.value, value: data.value})
        this.setState({tagOptions:tagOptions})
    }

    setTag(data) {
        console.log("DEBUG: data change", data.value)
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
                    onChange={(e,data)=>this.onTagsChanged(data.value)}
                    options={this.state.tagOptions}
                />
            </FormField>
        )
    }


    onClickHandler() {
        // e.preventDefault()
        let data = {}
        console.log("EditGoalComponent this.state.title: ", this.state.title)
        console.log("EditGoalComponent this.props.selectedGoal.photo: ", this.props.selectedGoal.photo)

        data['title'] = this.state.title
        // data.append("title", this.state.title)
        let start_at = moment(this.state.start_at).startOf('day').unix()
        let deadline = moment(this.state.deadline).startOf('day').unix() + (24*60*60 - 1)
        // console.log("Modified deadline: ", moment.unix(deadline).format('MMMM Do YYYY, h:mm:ss a'))
        data['start_at'] = start_at
        data['deadline'] = deadline
        // data.append("deadline", deadline)
        console.log("DEBUG: this state tags", this.state.tags)
        data['tags'] = this.state.tags
        // for (const tag of this.state.tags) {
        //     data.append("tags", tag)
        // }
        let key = ''
        if (this.props.selectedGoal.photo) { // A user already has a photo
            console.log("[DEBUG] this.props.selectedGoal.photo: ", this.props.selectedGoal.photo)
            const s3prefix = 'https://goalingball-test.s3.amazonaws.com/'
            const re = new RegExp(s3prefix)
            key = this.props.selectedGoal.photo.replace(re, '')
        } 
        console.log("[DEBUG] EditGoalComponent key: ", key)
        console.log("[DEBUG] EditGoalComponent formData: ", data)
    // const data = {
    //     title: formData.get('title'),
    //     photo: formData.get('photo'),
    //     deadline: formData.get('deadline'),
    //     tags: formData.get('tags')
    // }
        this.props.editGoal(this.props.selectedGoal.id, data, this.state.file, key)

        this.setState({ isEditing: true })
    }

    render(){
        console.log("selected goal: ", this.props.selectedGoal)
        return(
            <div className="EditGoalForm">
                {/* {this.props.selectedGoal == null} */}
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
                {/* <Button floated="right">Go Back</Button>
                <Button onClick={()=>this.onClickHandler()} floated="right">Confirm</Button> */}
                <Button floated="right">Go Back</Button>
                <Button onClick={()=>this.onClickHandler()} floated="right" className="ConfirmButton" id="ConfirmButtonEditGoalForm">Confirm</Button>
                </Form>
            </div>
            </LoadingOverlay>
            </div>
        )
    }

}

export default connect(null, { editGoal })(EditGoal)
