import React, {Component} from 'react'
import MenuBar from '../../../components/Menubar/MenuBarComponent'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form , Button, Input, Icon, Progress, Segment, FormField, Dropdown} from 'semantic-ui-react'
import './CreateGoal.css'
import { InputFile } from 'semantic-ui-react-input-file'
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);

class CreateGoal extends Component {

    state = {
      title: "",
      file: null,
      fileName: "",
      isUploading: false,
      statusCode: "",
      deadline: new Date(),
      startdate: new Date(),
      tags: [],
      tagOptions:[]
    }

    onPhotoSubmit = e => {
        e.preventDefault(); // Stop form submit
        console.log("form photo submit");
        this.fileUpload(this.state.file);
      }

    fileChange = e => {
        this.setState(
          { file: e.target.files[0], fileName: e.target.files[0].name },
          () => {
            console.log( "File chosen --->", this.state.file, console.log("File name  --->", this.state.fileName))
          }
        )
      }

    fileUpload = async file => {
        const formData = new FormData();
        formData.append("file", file);
        try {
          axios.post("/file/upload/goalPhoto").then(response => {
            console.log(response);
            console.log(response.status);
            this.setState({ statusCode: response.status }, () => {
              console.log(
                "This is the response status code --->",
                this.state.statusCode
              )
            })
          })
        } catch (error) {
          console.error(Error(`Error uploading file ${error.message}`));
        }
      }

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
            <Button style={{ marginTop: "7px" }} onClick={this.onPhotoSubmit}> Upload </Button>
            {this.statusCode && this.statusCode === 200 ? (
              <Progress style={{ marginTop: "10px" }} percent={100} success progress>
                File Upload Success
              </Progress>
            ) : statusCode && statusCode === 500 ? (
              <Progress style={{ marginTop: "20px" }} percent={100} error active progress>
                File Upload Failed
              </Progress>
            ) : null}
          </Form.Field>
          </Segment>
        )
    }

    selectDeadline(date) {
        console.log(date)
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
                    <Input id="todayDate" style={{ width: "175px" }} readOnly value={this.formatDate(this.state.startdate)}></Input>
                    <label>to</label>
                    <DatePicker style={{ width: "150px" }} selected={this.state.deadline} onChange={(date)=>{this.selectDeadline(date)}} />
                </FormField>
            </Segment>
        )
    }
    onTagsChanged(tags) {
        this.setState({tags: tags})
    }
    addTags(e, data){
        const tags = this.state.tags
        tags.push(data.value)
        this.addTagOptions(e, data)
        this.setState({tags: tags})
    }
    addTagOptions(e,data) {
        const tagOptions = this.state.tagOptions
        tagOptions.push({key: data.value, text: data.value, value: data.value})
        this.setState({tagOptions:tagOptions})
    }
    renderTag() {
        return(
            <FormField>
                <label>Add Tags</label>
                <Dropdown placeholder="add goal tags here" search selection clearable multiple allowAdditions fluid onAddItem={(e,data) => this.addTags(e, data)} options={this.state.tagOptions}/>
            </FormField>
        )
    }

    render(){
        return(
            <>
            <div className='menubar'>
                <MenuBar/>
            </div>
            <div className='Form'>
                 <h2 id="header">Add a Goal</h2>
                 <Form id="Form">
                {this.renderTitle()}
                {this.renderPhoto()}
                {this.renderDeadline()}
                {this.renderTag()}
                <Button>Confirm</Button>
                <Button>Go Back</Button>
                </Form>
            </div>
            </>
        )
    }
}

export default withRouter(CreateGoal)