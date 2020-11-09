import React, {Component} from 'react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import CalendarPanel from '../../components/CalendarPanel/CalendarPanelComponent'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react';
import GoalBodyComponent from '../../components/GoalBody/GoalBodyComponent'
import './GoalListComponent.css'
import Axios from 'axios'
class GoalList extends Component {

    state = {
        selectedDate: null,
        sampleGoalList:[
            {
                "id": 1,
                "user": 1,
                "title": "test_title_1",
                "photo": "test_photo_url.com",
                "created_at": "2020-11-09 07:04:59",
                "updated_at": "2020-11-09 07:04:59",
                "deadline": "2020-11-10 05:38:20",
                "tags": [
                    "apple",
                    "banana"
                ]
            },
            {
                "id": 2,
                "user": 1,
                "title": "test_title_2",
                "photo": "test_photo_url.com",
                "created_at": "2020-11-09 07:04:59",
                "updated_at": "2020-11-09 07:04:59",
                "deadline": "2020-11-10 05:38:20",
                "tags": [
                    "apple",
                    "banana"
                ]
            },
            {
                "id": 3,
                "user": 1,
                "title": "test_title_3",
                "photo": "test_photo_url.com",
                "created_at": "2020-11-09 07:04:59",
                "updated_at": "2020-11-09 07:04:59",
                "deadline": "2020-11-10 05:38:20",
                "tags": [
                    "apple",
                    "banana"
                ]
            }
        ]
    }

    componentDidMount() {
        
    }


    render(){

        //map sampleGoalList to goalBodyComponent
        const toGoalBody = this.state.sampleGoalList.map((goal) => {
            return(<GoalBodyComponent 
                title={goal.title} 
                id={goal.id} 
                deadline={goal.deadline} 
                tags={goal.tags}/>)
            })

        return(
            <div>
                <div className='menubar'>
                    {console.log(this.props)}
                    <MenuBar/>
                </div>
                <div className='calendarpanel'>
                    <CalendarPanel/>
                </div>
                <div className='goallist'>
                    <h2 className="componentTitle">What's for today?</h2>
                    {toGoalBody}
                </div>
            </div>
        )
    }
}

export default GoalList