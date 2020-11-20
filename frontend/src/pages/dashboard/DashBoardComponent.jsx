import React, {Component} from 'react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import './DashBoard.css'
class DashBoardComponent extends Component {
    render(){
        return(
            <div className='dashboard'>
                <div className='menubar'>
                    <MenuBar/>
                </div>
                <div>
                    <h2 className="dashboardTitle">Your Dashboard</h2>
                </div>
            </div>
        )
    }
}

export default DashBoardComponent