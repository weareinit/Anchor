import React,{Component} from 'react';

import Navbar from '../../components/navbar';

import './style.css';

class Notifications extends Component{
    constructor(props){
        super(props);

        this.state = {
            subject: null,
            body: null,
            tag: null
        }
    }

    handleInputChange(property) {
        return e => {
          this.setState({
            [property]: e.target.value
          });
        };
      }

      /**
       * In the works
       */
      handleClick = () => {
          const{subject,body,tag} = this.state;

        try{
            if(!body || !subject || !tag)
                throw('Please fill out rest of form')

          console.log(body);

        }catch(e){
            alert(e);
        }
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
                        <input  onChange={this.handleInputChange('subject')} type="text" />
                    </div>
                    <div className="notification">
                        <h2>Body</h2>
                        <textarea onChange={this.handleInputChange('body')} rows="4" cols="40"/>
                    </div>
                    <div className="notification">
                        <h2>Tag</h2>
                        <input onChange={this.handleInputChange('tag')} type="text" />
                    </div>
                    <button onClick={this.handleClick} id="notificationBtn">Send</button>
                </div>
                
            </div>
        )
    }
}

export default Notifications;