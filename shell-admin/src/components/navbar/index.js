import React,{Component,Fragment} from 'react';

import {slide as Menu} from 'react-burger-menu';

import './style.css';

var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '36px',
      top: '36px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      margin: 15
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

class Navbar extends Component{
    constructor(props){
        super(props)

        this.state = {
            applicants: null,
            loading: false
        }
        

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