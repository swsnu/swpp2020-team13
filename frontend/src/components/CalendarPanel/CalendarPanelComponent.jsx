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
        <nav class='panel'>
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
          />

        <ul>
            <li>
                Goal number 1
            </li>
            <li>
                Goal number 2
            </li>
            <li>
                Goal number 3 which is very very long
            </li>
        </ul>
        </nav>
      );
    }
  }

export default CalendarPanelComponent