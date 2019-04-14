import React,{Component,Fragment} from 'react';

import {slide as Menu} from 'react-burger-menu';

import styles from './style';

class Navbar extends Component{
    constructor(props){
        super(props)
    }
    showSettings (event) {
        event.preventDefault();
      }

    
    render(){
       
        return(
            <Menu styles = {styles}>
                <a id="home" className="menu-item" href="/hackers">Hackers</a>
                <a id="statistics" className="menu-item" href="/statistics">statistics</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
                <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
            </Menu>

        )
    }
}

export default Navbar;