import React from "react";
import { Card, Icon, Button, Label } from "semantic-ui-react";
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import history from '../../history'
import {getGoal, deleteGoal} from '../../store/actions/index'
import { connect } from "react-redux";

class GoalCard extends React.Component {

  state = {
    title: this.props.goal.title,
    url: ((this.props.goal.photo).length == 0) ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png' : this.props.goal.photo
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
  // BUG: randomColor func is generating undesired popups
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
    history.push('/goalhistory/' + this.props.goal.id)
  }

  onClickEditGoalHandler = async () => {
    await this.props.getGoal(this.props.goal.id)
    history.push('/edit')
  }

  onClickDeleteHandler = () => {
      var deleteGoal = window.confirm("Tasks and achievements of this goal will be lost. Are you sure?")
      if(deleteGoal) {
        this.props.deleteGoal(this.props.goal.id)
      }
  }

  render() {
    
    const url = 'url(' + this.state.url + ')'
    return (
      <Card className="DashGoalCardComp"
      style={{
        width: '210px'
      }}
      >
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
          <Button.Group size='tiny'>
          <Button onClick={this.onClickHandler}>
            Click for Details
          </Button>
          <Button size="tiny" compact icon onClick={()=>this.onClickEditGoalHandler()}><Icon name='edit'/></Button>
          <Button size="tiny" compact icon onClick={()=>this.onClickDeleteHandler()}><Icon name='trash'/></Button>
          </Button.Group>
        </Card.Content>
      </Card>
    );
  }
}

export default connect(null, {getGoal, deleteGoal})(withRouter(GoalCard))