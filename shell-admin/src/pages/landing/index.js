import React, {Component} from 'react';
import axios from 'axios';

import Logo from '../../assets/shellLogo.svg'

import './style.css';

const SERVER_URL = "http://35c58f01.ngrok.io"

class Landing extends Component{
    constructor(props){
        super(props)

        this.state = {
            password: null
        }
    }

    handleInputChange(property) {
        return e => {
          this.setState({
            [property]: e.target.value
          });
        };
      }

      submit = async () => {
        const {password} = this.state;

        try{
           let {data} = await axios.post('http://35c58f01.ngrok.io/token',{password});
           
           const {token} = data.data
           localStorage.setItem("token",token);

           this.props.history.push('/hackers');

        }catch(e){
            alert('wrong password');
        }
      }

    render(){
        return(
            <div className = "landingContainer">
                <img className = "logo" src={Logo}/>
                <div className="passwordBox">
                    <h2>PASSWORD</h2>
                    <input type="text" value={this.state.password} onChange ={this.handleInputChange('password')}/>
                </div>
                <button className="landingBtn" onClick={this.submit}>Submit</button>
            </div>
        )
    }
}

export default Landing