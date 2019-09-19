import React, { Component } from 'react';

import Admin from '../../services/admin';
import Navbar from '../../components/navbar';

class WalkIn extends Component{
  constructor(props){
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null
    }
  }

  handleInputChange(property) {
    return e => {
      this.setState({
        [property]: e.target.value
      });
    };
  }

  handleClick = async () => {
    const{ firstName, lastName, email } = this.state;
    const { history } = this.props;

    console.log(this.state);

  try{
    if(!email || !lastName || !firstName)
      throw('Please fill out rest of form')

      await Admin.walkIn(firstName,lastName,email,history);
  }catch(e){
      console.log(e);
  }
}

  render(){
    return(
      <div>
          <Navbar />
          <div className="notificationsOuter">
              <h1>Hacker Walk In</h1>
          </div>
          <div className="notificationsContainer">
              <div className="notification">
                  <h2>First Name</h2>
                  <input  onChange={this.handleInputChange('firstName')} type="text" />
              </div>
              <div className="notification">
                  <h2>Last Name</h2>
                  <input onChange={this.handleInputChange('lastName')} type="text" />
              </div>
              <div className="notification">
                  <h2>Email</h2>
                  <input onChange={this.handleInputChange('email')} type="text" />
              </div>
              <button onClick={this.handleClick} id="notificationBtn">Walk In Hacker</button>
          </div>     
      </div>
  )
  }
}

export default WalkIn;