import React, { Component, useRef } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Form , Button, Input, Icon, Progress, Segment, FormField, Dropdown, label, Grid, Container, GridColumn} from 'semantic-ui-react'
import Slider from "@material-ui/core/Slider"
import './AddAccForm.css'
import { add_achievement, edit_achievement } from '../../store/actions';
import LoadingOverlay from 'react-loading-overlay';

class AddAccForm extends Component {

    state = {
        achievement: this.props.achievement,
        isEdit: this.props.achievement ? true : false,
        isCreating: false,
        percentage_complete: this.props.achievement ? this.props.achievement.percentage_complete : 0,
        today: (this.props.today == undefined) ? null : moment(this.props.today).startOf('day').unix() + (24*60*60) - 1,
        file: null,
        fileName: "",
        photo: this.props.achievement ? this.props.achievement.photo :
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
        description: this.props.achievement ? this.props.achievement.description : ""
    }

    // DiscreteSlider = () => {
    //     // const classes = useStyles()  
    //     return (
    //       <div className="slider">
    //         <h5>
    //             How much percentage did you do?
    //         </h5>
    //         <Slider
    //           defaultValue={80}
    //           getAriaValueText={this.valuetext}
    //           aria-labelledby="discrete-slider-always"
    //           step={10}
    //           // marks={marks}
    //           valueLabelDisplay="on"
    //         />
    //       </div>
    //     )
    //   }

    fileChange = e => {
        if(e.target.files){
            this.setState(
                { file: e.target.files[0], fileName: e.target.files[0].name,},
                () => { console.log( "File chosen --->", this.state.file, console.log("File name  --->", this.state.fileName))},
            )
            // console.log("AddAccForm this.state.file: ", this.state.file)
            
            this.setState({ photo:  URL.createObjectURL(e.target.files[0])});
            // let reader = new FileReader()
            // // set a callback function
            // reader.onloadend = () => {
            //     console.log("reader.result: ", reader.result)
            //     this.setState({ photo: reader.result });
            // }
            // reader.readAsDataURL(e.target.files[0])
            // console.log(this.state.photo) // caution: do not accept heic files
        }  
    }

    fileRender() {
        return(
            <Segment>
                <Grid columns='2' divided>
                    <GridColumn width='5'>
                        <h5>See Photo Preview</h5>
                    </GridColumn>
                    <GridColumn width='10'>
                    <img id="image" src={this.state.photo} className="AccPreviewImage"></img>
                    </GridColumn>
                </Grid>
                {/* <AccPhotoPreview url={imageUrl}></AccPhotoPreview> */}
            </Segment>
        )
    }

   renderPhoto() {
        return (
            <Segment className="AddAccPhoto">
            <Form.Field>
                <label id="PhotoInput">{this.state.isEdit ? "Edit " : "Add "} Achievement Photo</label>
            <Button as="label" htmlFor="file" type="button" animated="fade">
              <Button.Content visible>
                <Icon name="file" />
              </Button.Content>
              <Button.Content hidden>Choose a File</Button.Content>
            </Button>
            <input type="file" id="file" className="AccPhoto" hidden onChange={this.fileChange}/>
            <Form.Input fluid label="Photo Chosen " placeholder="Use the above bar to browse your file system" readOnly
              value={this.state.fileName}
            />
            <Button style={{ marginTop: "7px" }} onClick={this.fileChange} id="UploadPhotoButton"> See Preview </Button>
          </Form.Field>
          </Segment>
        )
    }

    renderDescription() {
        return (
            <Form.Field className="AddAccDes">
                <label>Description</label>
                <Input 
                    fluid
                    placeholder='Write a description about your acheivement'
                    value={this.state.description}
                    onChange={e => this.setState({description: e.target.value})}
                />
            </Form.Field>
        )
    }

    closeHandler = () => {
        this.props.onSubmit()
    }

    onPercentageCompleteChange = (event, newValue) => {
      this.setState({percentage_complete: newValue})  
    //   console.log(this.state.percentage_complete)
    }

    handleSubmit = async () => {
        this.setState({ isCreating: true })
        if (this.state.isEdit) {
            const id = this.props.achievement.id
            const key = this.props.achievement.photo
            const data = {
                // task_id: this.props.task_id,
                percentage_complete: this.state.percentage_complete,
                written_at: this.state.today,
                description: this.state.description,
                photo: this.state.photo
            }
            await this.props.edit_achievement(id, data, this.state.file, key)
        } 
        else {
            let form = new FormData()
            // console.log("DEBUG Ach form: sending percentage_complete", this.state.percentage_complete)
            form.append("task_id", this.props.task_id)
            form.append("percentage_complete", this.state.percentage_complete)
            form.append("written_at", this.state.today)
            form.append("description", this.state.description)
            // form.append("photo", this.state.photo)
            await this.props.add_achievement(form, this.state.file)    
        }
        this.props.onSubmit(false)

    }

    render(){
        // console.log("this.props.achievement: ", this.props.achievement)
        return(
        <LoadingOverlay
            className="AddAccForm"
            active={this.state.isCreating}
            spinner
            text={this.state.isEdit ? "Edit " : "Add" + "ing your achivement..."}
            >
            <Form>
                {/* {console.log("DEBUG ADD Ac", this.props)} */}
                <Segment className="AddAccForm" id="AddAccFormSegment"
                style={
                    {boxShadow: "none", border: "none"}
                    }>
                <h3>&nbsp; {this.state.isEdit ? "Edit " : "Add "} Achievements</h3>

                {/* Add slider to record done_percentage */}            
                <Form.Group>
                    <div>
                    <Grid columns='2' className="SliderRoot">
                        <GridColumn width={6}>
                        <h4 className="SliderRootTitle">
                            How much did you do?
                        </h4>
                        </GridColumn>
                        <GridColumn width={8}>
                            <Slider
                            defaultValue={this.state.percentage_complete}
                            aria-labelledby="discrete-slider-always"
                            step={10}
                            onChange={this.onPercentageCompleteChange}
                            // marks={marks}
                            valueLabelDisplay="on"
                            />
                        </GridColumn>
                    </Grid>
                    </div>
                    </Form.Group>
                        {/* Upload and preview photo*/}
                        <div>
                            <Grid columns='2'>
                                <GridColumn className="AccPhotoForm" width={6}>
                                {this.renderPhoto()}
                                </GridColumn>
                                <GridColumn width={8}>
                                {this.fileRender()}
                                </GridColumn>
                            </Grid>
                        </div>
                        {this.renderDescription()}
                        <Button.Group>
                            <Form.Button className="AddAccSubmitButton" onClick={this.handleSubmit}>Submit</Form.Button>
                            <Form.Button className="AddAccCloseButton" onClick={this.closeHandler}>Close</Form.Button>                           
                        </Button.Group>
                </Segment>
            </Form>
            </LoadingOverlay>
        )
    }

}

export default connect(null, { add_achievement, edit_achievement })(AddAccForm)
