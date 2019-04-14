import React, {Component} from 'react';
import axios from 'axios';

import Logo from '../../assets/shellLogo.svg';
import Starfish from '../../assets/Starfish.svg';
import Sandals from '../../assets/Sandals.svg';

import './style.css';

const SERVER_URL = "http://be46bb0d.ngrok.io"

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
           let {data} = await axios.post(SERVER_URL+'/token',{password});
           
           const {token} = data.data
           localStorage.setItem("token",token);

           this.props.history.push('/hackers');

        }catch(e){
            alert('Invalid Password');
        }
      }

    render(){
        return(
            <div>
                <div className="backgroundObjects">
                    <img id="starfish" className="decor" src={Starfish}/>
                    <img id="sandals" className="decor" src={Sandals} />
                </div>
                <div className = "landingContainer">
                <img className = "logo" src={Logo}/>
                <div className="passwordBox">
                    <h2>PASSWORD</h2>
                    <input type="text" 
                    value={this.state.password} 
                    onChange ={this.handleInputChange('password')}
                    />
                </div>
                <button className="landingBtn" onClick={this.submit}>Submit</button>
                </div>
            </div>
            
        )
    }
}

export default Landing