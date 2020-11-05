import React from 'react'
import "./MenuBar.css"

import { Icon, Sidebar, Menu } from 'semantic-ui-react'
const MenuBarComponent = (props) => {
    return (
        <Sidebar className="Sidebar"
        animation='uncover'
        icon='labeled'
        vertical
        visible="true"
        // width='very thin'
        >
            <Menu.Item as='a' >
                <button class='ui basic button' onClick={props.clickedCreate} className='button-create'>
                    <Icon name='plus circle' size='large' id='icon'></Icon>
                    <br></br>
                    Create
                </button>
            </Menu.Item>
            <br></br>
            <Menu.Item as='a'>
                <button class='ui basic button' onClick={props.clickedMain} className='button'>
                    <Icon name='home' size='large' id='icon'></Icon>
                    <br></br>
                    Main
                </button>
            </Menu.Item>
            <br></br>
            <Menu.Item as='a'>
                <button class='ui basic button' onClick={props.clickedDash} className='button'>
                    <Icon name='chart bar outline' size='large' id='icon'></Icon>
                    <br></br>
                    Dashboard
                </button>
            </Menu.Item>
            <br></br>
            <Menu.Item as='a'>
                <button class='ui basic button' onClick={props.clickedExplore} className='button'>
                    <Icon name='search' size='large' id='icon'></Icon>
                    <br></br>
                    Explore
                </button>
            </Menu.Item>
            <br></br>
            <Menu.Item as='a'>
                <button class='ui basic button' onClick={props.clickedProfile} className='button'>
                    <Icon name='user circle' size='large' id='icon'></Icon>
                    <br></br>
                    Profile
                </button>
            </Menu.Item>
            <br></br>
            <Menu.Item as='a'>
                <button class='ui basic button' onClick={props.clickedLogout} className='button-logout'>
                    <Icon name='arrow alternate circle right outline' size='large' id='icon'></Icon>
                    <br></br>
                    Logout
                </button>
            </Menu.Item>

        </Sidebar>
    )
}

export default MenuBarComponent