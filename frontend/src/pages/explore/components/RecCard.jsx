import React from "react";
import { Card, Icon, Button, Label, Image } from "semantic-ui-react";
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import history from '../../../history'
class RecCard extends React.Component {

  state = {
    title: this.props.goal.title,
    url: (this.props.goal.photo == null) ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png' : this.props.goal.photo
  }

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  renderTags = () => {
    let label = []
    label = this.props.goal.tags.map(t => {
      const color = this.randomColor()
    return (<Label horizontal style={
      {marginTop: '2px', marginBottom: '2px', backgroundColor: color, color: '#FFFFFF'}
    }>{t}</Label>)
      }
    )
    return label
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

onClickHandler = () => {
    history.push('/explore/goalhistory/' + this.props.goal.id)
  }

  render() {
    
    const url = 'url(' + this.state.url + ')'
    return (
      <Card className="RecCardComp" style={
          {width: '200px'}
      }>
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
              {padding: '12px', paddingBottom: '0px'}
            }
            > 
        </Card.Content>
        <Card.Description textAlign="center"
        style={
          {color: "#807e7e", marginBottom: '5px'}
        }>
            <Icon name='user circle'></Icon>&nbsp;{this.props.goal.username}
            </Card.Description>
        <Card.Content extra>
          <Button floated="right" fluid onClick={this.onClickHandler}>
            Look More
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

export default (withRouter(RecCard))