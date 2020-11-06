import React, { useState, Component } from 'react';
import Calendar from 'react-calendar'
import "./CalendarPanel.css"


import { Icon, Sidebar, Menu } from 'semantic-ui-react'


class CalendarPanelComponent extends Component {
    state = {
      date: new Date(),
    }
   
    onChange = date => {
        this.setState({ date })
        console.log(date)
    }

    
   
    render() {
      return (
        <div>
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
      );
    }
  }

export default CalendarPanelComponent