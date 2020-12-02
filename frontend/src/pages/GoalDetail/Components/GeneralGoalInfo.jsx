import React, {Component} from 'react'
import { Container, Segment, Grid, Label, List, Icon } from 'semantic-ui-react'
import './GeneralGoalInfo.css'
import moment from 'moment'
class GeneralGoalInfo extends Component {

//Things to put in render: title / goal duration / tags / 

    // start_at is a timestamp
    startAtDate = (start_at) => {
        return moment.unix(start_at).format('MMM Do YYYY')
        // return moment.unix(deadline).format('LL')
    }

    // deadline is a timestamp
    deadlineDate = (deadline) => {
        return moment.unix(deadline).format('MMM Do YYYY')
        // return moment.unix(deadline).format('LL')
    }

    renderTags = () => {
        let label = []
        label = this.props.selectedGoal.tags.map(t => {
          const color = this.randomColor()
        return (
            <List.Item>
        <Label horizontal style={
          { marginBottom: '2px', backgroundColor: color, color: '#FFFFFF'}
        }>{t}</Label></List.Item>
        )
          }
        )
        return label
    }

    getRandomInt = (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    
    randomColor = () => {
        let randomNumber = this.getRandomInt(0, 5)
        switch(randomNumber) {
          case(0):
            return "#24b4ab"
          case(1):
            return "#173f5f"
          case(2):
            return "#686566"
          case(3):
            return "#20639b"
          case(4):
            return "#ed553b"
          case(5):
            return "#04837c"
        } 
      }

    render() {
        return(
            <div className="GeneralGoalInfoPanel">
                <Segment style={
                    {boxShadow: "none"}
                    }>
                    <Grid row='2'>
                        <Grid.Row>
                <h2 className="GeneralGoalInfoTitle">{this.props.selectedGoal.title}</h2>
                        </Grid.Row>
                        <Grid.Row className="GeneralGoalInfoSub">
                            <Grid.Column width="5">
                                <p style ={
                                    { color: "#807e7e"}
                                }>From {this.startAtDate(this.props.selectedGoal.start_at)}, Until {this.deadlineDate(this.props.selectedGoal.deadline)}</p>
                            </Grid.Column>
                                {this.renderTags()}
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        )
    }
}


export default GeneralGoalInfo