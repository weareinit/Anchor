import React,{Component} from 'react';

import Navbar from '../../components/navbar';

import './style.css';

class Notifications extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="notificationsOuter">
                    <h1>Create a push notification</h1>
                </div>
                <div className="notificationsContainer">
                    <div className="notification">
                        <h2>Subject Line</h2>
                        <input type="text" />
                    </div>
                    <div className="notification">
                        <h2>Body</h2>
                        <textarea rows="4" cols="40"/>
                    </div>
                    <div className="notification">
                        <h2>Tag</h2>
                        <input type="text" />
                    </div>
                    <button id="notificationBtn">Send</button>
                </div>
                
            </div>
        )
    }
}

export default Notifications;