import React,{Component} from 'react';

import './style.css';

import Admin from '../../services/admin';

import NavBar from '../../components/navbar';

class Reminders extends Component{
    constructor(props){
        super(props);
    }

    async componentDidMount(){
        const{history} = this.props;

        await Admin.verifyLogin(history);
    }

    render(){
        return(
            <div>
                <NavBar />
                <div className="reminderOuter">
                    <h1>Reminders Page</h1>
                </div>
                <div className="reminderContainer">
                    <div className="reminder">
                        <button className="remindBtn">Remind Apply</button> <br />
                        <p>This will send an email to everyone who has not applied reminding to them to apply</p>
                    </div>
                    <div className="reminder">
                        <button className="remindBtn">Remind Confirm</button> <br />
                        <p>This will send an email to everyone who has not confirmed reminding to them to confirm</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reminders;