import React, {Component} from 'react';

import Logo from '../../assets/shellLogo.svg'

import './style.css';

class Landing extends Component{
    constructor(props){
        super(props)

        this.state = {
            password: ''
        }
    }

    handleInputChange(property) {
        return e => {
          this.setState({
            [property]: e.target.value
          });
        };
      }

    render(){
        return(
            <div className = "landingContainer">
                <img className = "logo" src={Logo}/>
                <div className="passwordBox">
                    <h2>PASSWORD</h2>
                    <input type="text" value={this.state.password} onChange ={this.handleInputChange('password')}/>
                </div>
                <button className = "landingBtn">Submit</button>
            </div>
        )
    }
}

export default Landing