import React, { Component, useRef } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Form , Button, Input, Icon, Progress, Segment, FormField, Dropdown, label, Grid, Container, GridColumn} from 'semantic-ui-react'
import { makeStyles } from "@material-ui/core/styles"
import Slider from "@material-ui/core/Slider"
import './AddAccForm.css'
  
class AddAccForm extends Component {
    state = {
        file: null,
        fileName: "",
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
        des: ""
    }

    valuetext = (value) => {
        return `${value}°%`;
    }

    DiscreteSlider = () => {
        const classes = useStyles()
      
        return (
          <div className="slider">
            <h5>
                How much percentage did you do?
            </h5>
            <Slider
              defaultValue={80}
              getAriaValueText={this.valuetext}
              aria-labelledby="discrete-slider-always"
              step={10}
              // marks={marks}
              valueLabelDisplay="on"
            />
          </div>
        )
      }

      fileChange = e => {
        if(e.target.files){
        this.setState(
          { file: e.target.files[0], fileName: e.target.files[0].name,},
          () => { console.log( "File chosen --->", this.state.file, console.log("File name  --->", this.state.fileName))},
          )
          console.log(this.state.file)
          let reader = new FileReader()
          reader.onloadend = () => {
            this.setState({ imageUrl: reader.result });
          }
          reader.readAsDataURL(e.target.files[0])
          console.log(this.state.imageUrl) // caution: do not accept heic files
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
                    <img id="image" src={this.state.imageUrl} className="AccPreviewImage"></img>
                    </GridColumn>
                </Grid>
                {/* <AccPhotoPreview url={imageUrl}></AccPhotoPreview> */}
            </Segment>
        )
    }

      renderPhoto() {
        return (
            <Segment>
            <Form.Field>
                <label id="PhotoInput">Add Achievement Photo</label>
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
            <Button style={{ marginTop: "7px" }} onClick={this.fileChange} id="UploadPhotoButton"> See Preview </Button>
          </Form.Field>
          </Segment>
        )
    }

    renderDes() {
        return (
            <Form.Field className="AddAccDes">
                <label>Description</label>
                <Input placeholder='Write a description about your acheivement' fluid
                onChange={(e)=>this.setState({des: e.target.value})}></Input>
            </Form.Field>
        )
    }

    closeHandler = () => {
        this.props.onSubmit(false)
    }

    render(){
        return(
            <Form>
                <Segment className="AddAccForm" id="AddAccFormSegment">
                <h3>&nbsp; Add Achievements</h3>

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
                            defaultValue={80}
                            getAriaValueText={this.valuetext}
                            aria-labelledby="discrete-slider-always"
                            step={10}
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
                        {this.renderDes()}
                        <Button.Group>
                            <Form.Button className="AddAccSubmitButton">Submit</Form.Button>
                            <Form.Button className="AddAccSubmitButton" onClick={this.closeHandler}>Close</Form.Button>                           
                        </Button.Group>
                </Segment>
            </Form>
        )
    }

}

export default AddAccForm
