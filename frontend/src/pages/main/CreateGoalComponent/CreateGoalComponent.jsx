import React, { Component, useRef } from 'react'
import { connect } from 'react-redux'
import MenuBar from '../../../components/Menubar/MenuBarComponent'
import { withRouter } from 'react-router-dom'
import { Form , Button, Input, Icon, Progress, Segment, FormField, Dropdown, label, Grid, Container} from 'semantic-ui-react'
import './CreateGoal.css'
import { InputFile } from 'semantic-ui-react-input-file'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
import actionCreators from '../../../store/actions'
import { addGoal } from '../../../store/actions'
import { isThisMonth } from 'date-fns/esm'
import moment from 'moment'
const mapDispatchToProps = dispatch => {
    return {
        onAddGoal: (formData, file) => dispatch(actionCreators.addGoal(formData, file))
    }
}
class CreateGoal extends Component {

    state = {
      title: "",
      file: null,
      fileName: "",
      upload: false,
      deadline: new Date(),
      startdate: new Date(),
      tags: [],
      tagOptions:[]
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

    // fileRender() {
    //     if (this.state.upload == true) {
    //         const imageUrl = URL.createObjectURL(this.state.file)
    //         console.log(imageUrl)
    //         return(
    //             <img id="image" src={imageUrl}></img>
    //         )
    //     }
    //     else{
    //         return null;
    //     }
    // }

    renderTitle() {
        return (
            <Form.Field>
                <label>Goal Title</label>
                <Input placeholder='Enter Title Here' onChange={(e)=>this.setState({title: e.target.value})}></Input>
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
            <Form.Input fluid label="Photo Chosen " placeholder="Use the above bar to browse your file system" readOnly
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
                    <Input id="todayDate" style={{ width: "175px" }} readOnly value={this.formatDate(this.state.startdate)}></Input>
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
                <Dropdown placeholder="add goal tags here" search selection 
                clearable multiple allowAdditions fluid 
                onAddItem={(e,data) => this.addTagOptions(e, data)} 
                onChange={(e,data)=>this.setTag(data)}
                options={this.state.tagOptions}
                />
            </FormField>
        )
    }


    onClickHandler() {
        // e.preventDefault()
        console.log(this.state.tags)
        let data = new FormData()
        data.append("title", this.state.title)
        data.append("deadline", moment(this.state.deadline).format("YYYY-MM-DD HH:MM:SS"))
        data.append("tags", this.state.tags)
        this.props.addGoal(data, this.state.file)
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
            <>
            <div className='menubar'>
                <MenuBar/>
            </div>
            <div className='FormCreate'>
                 <h2 id="header">Add a Goal</h2>
                 <Form id="FormCreateForm">
                {this.renderTitle()}
                {this.renderPhoto()}
                {/* {this.fileRender()} */}
                {this.renderDeadline()}
                {this.renderTag()}
                <Button floated="right">Go Back</Button>
                <Button onClick={()=>this.onClickHandler()} floated="right">Confirm</Button>
                </Form>
            </div>
            </>
        )
    }

}



export default connect(mapDispatchToProps, { addGoal })(withRouter(CreateGoal))