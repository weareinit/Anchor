import React,{Component} from 'react';

import './style.css';

import Admin from '../../services/admin';
import NavBar from '../../components/navbar';
import ConfirmModal from '../../components/confirmModal';

class Reminders extends Component{
  constructor(props){
    super(props);

  this.state = {
    openModal: false,
    description: null,
    choice: null
  }
  }

  async componentDidMount(){
    const{history} = this.props;

    await Admin.verifyLogin(history);
  }

  handleClick = async () => {
    const { history } = this.props;

    await Admin.updateCalendar(history);
  }

  render(){
    const { description, choice, openModal } = this.state;
    const { history } = this.props;

    const func = choice === 'apply' ? () => Admin.remindApply(history) : () => Admin.remindConfirm(history);

    return(
      <div>
        <NavBar />
        <div className="reminderOuter">
        <ConfirmModal close = { () => this.setState({ openModal:false }) } action={ func } open ={ openModal } description = { description } />
          <h1>Schedule Page</h1>
        </div>
        <div className="reminderContainer">
          <div className="reminder">
            <button onClick = {this.handleClick} className="remindBtn">Update Schedule</button> <br />
            <p>This will update the calendar</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Reminders;