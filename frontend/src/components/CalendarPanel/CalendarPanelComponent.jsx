import React, { useState, Component } from 'react';
import Calendar from 'react-calendar'
import "./CalendarPanel.css"
import moment from 'moment'

import { Icon, Sidebar, Menu, List } from 'semantic-ui-react'


class CalendarPanelComponent extends Component {
    state = {
      date: new Date(),
    }
   
    onChange = date => {
        this.setState({ date })
        console.log("DEBUG on Calendar",moment(date).endOf("day"))
        this.props.onSubmit(date)
    }
    
    render() {

      const goalTitleList = this.props.goalList.map(g => {return(<List.Item style={
        {
          paddingLeft: '20px',
          cursor: 'default'
        }
      }>
        <List.Content>
          <List.Header as='a'>{g.title}</List.Header>
      </List.Content>
      </List.Item>)})
      return (
        <nav class='panel' className="CalendarPanel">
          <Calendar id="Calendar"
            onChange={this.onChange}
            value={this.state.date}
          />
          <List relaxed bulleted style={
            {
              paddingLeft: '30px'
            }
          }>
          <p style ={
            {
              marginTop: '10px'
            }
          }>GOALS</p>
            {goalTitleList}
          </List>
        </nav>
      );
    }
  }

export default CalendarPanelComponent