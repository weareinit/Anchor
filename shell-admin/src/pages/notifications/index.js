import React,{Component} from 'react';

import './style.css';

import Admin from '../../services/admin';

import Navbar from '../../components/navbar';

class Notifications extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: null,
            body: null,
            tag: null
        }
    }

    async componentDidMount(){
        const {history} = this.props;

        await Admin.verifyLogin(history);
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
      handleClick = async () => {
          const{title,body,tag} = this.state;
          const {history} = this.props;

        try{
            if(!body || !title || !tag)
                throw('Please fill out rest of form')
        
            const data = {tag};

            await Admin.sendNotifications(title,body,data,history);
        }catch(e){
            console.log(e);
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
                        <h2>Title</h2>
                        <input  onChange={this.handleInputChange('title')} type="text" />
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