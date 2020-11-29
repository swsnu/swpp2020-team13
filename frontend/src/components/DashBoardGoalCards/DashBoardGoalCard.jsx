import React from "react";
import { Card, Icon, Button, Label } from "semantic-ui-react";
import moment from 'moment'
export default class GoalCard extends React.Component {

  state = {
    title: this.props.goal.title,
    url: ((this.props.goal.photo).length == 0) ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png' : this.props.goal.photo
  }

  // getRandomInt = (min, max) => {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  renderTags = () => {
    let label = []
    label = this.props.goal.tags.map(t => {
      // const color = this.randomColor()
    return (<Label horizontal style={
      {marginTop: '2px', marginBottom: '2px', backgroundColor: "#24b4ab"}
    }>{t}</Label>)
    }
    )
    return label
  }
  // BUG: randomColor func is generating undesired popups
  // randomColor = () => {
  //   let randomNumber = this.getRandomInt(0, 2)
  //   print(randomNumber)
  //   switch(randomNumber) {
  //     case(0):
  //       return "#24b4ab"
  //     case(1):
  //       return "#9fe3c1"
  //     case(2):
  //       return "#fa8072"
  //   } 
  // }
  render() {
    
    const url = 'url(' + this.state.url + ')'
    return (
      <Card className="DashGoalCardComp">
        <Card.Content
          style={{
            height: "180px",
            backgroundImage: url,
            backgroundSize: "cover",
          }}
        >
        <Card.Description>
        {this.renderTags()}
          </Card.Description>
        </Card.Content>
        <Card.Content header={this.props.goal.title} 
            textAlign="center"s
            style={
              {padding: '12px'}
            }
            > 
        </Card.Content>
        <Card.Description textAlign="center"
        style={
          {color: "#807e7e", marginBottom: '2px'}
        }>
              From {moment.unix(this.props.goal.start_at).format('MMM Do YYYY')} <br></br> Until {moment.unix(this.props.goal.deadline).format('MMM Do YYYY')}
            </Card.Description>
        <Card.Content extra>
          <Button floated="right" fluid>
            Click for Details
          </Button>
        </Card.Content>
      </Card>
    );
  }
}
