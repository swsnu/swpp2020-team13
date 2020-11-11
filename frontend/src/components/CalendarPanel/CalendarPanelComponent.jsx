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
        this.props.onSubmit(date)
    }
    
    render() {
      return (
        <nav class='panel'>
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
          />
        <ul>
            <li>
                Example Goal 1
            </li>
            <li>
                Example Goal 2
            </li>
            {/* <li>
                Example Goal 3
            </li> */}
        </ul>
        </nav>
      );
    }
  }

export default CalendarPanelComponent