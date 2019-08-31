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

  handleRemindApply = () => {
    const description = "send a reminder to apply to all registered";
    const choice = "apply"
    this.setState({openModal: true, description, choice});
  }

  handleRemindConfirm = () => {
    const description = "send a reminder to confirm to all accepted";
    const choice = "confirm"
    this.setState({openModal: true, description, choice});
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
          <h1>Reminders Page</h1>
        </div>
        <div className="reminderContainer">
          <div className="reminder">
            <button  onClick = {this.handleRemindApply} className="remindBtn">Remind Apply</button> <br />
            <p>This will send an email to everyone who has not applied reminding to them to apply</p>
          </div>
          <div className="reminder">
            <button onClick = {this.handleRemindConfirm} className="remindBtn">Remind Confirm</button> <br />
            <p>This will send an email to everyone who has not confirmed reminding to them to confirm</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Reminders;