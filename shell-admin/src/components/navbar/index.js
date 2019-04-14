import React,{Component,Fragment} from 'react';

import {slide as Menu} from 'react-burger-menu';
import Shell from '../../assets/Shell.png'

import styles from './style';

class Navbar extends Component{
    constructor(props){
        super(props)
    }
    
    logout = async () => {
        try{
            await localStorage.setItem("token",null);

            this.props.history.push('/');

        }catch(e){
            console.log(e)
        }
    }

    
    render(){
       
        return(
            <Menu styles = {styles}>
                <img style = {styles.shell} src={Shell}/>
                <a id="home" className="menu-item" href="/hackers">Hackers</a>
                <a id="statistics" className="menu-item" href="/statistics">statistics</a>
                <a id="contact" className="menu-item" href="/live">Live</a>
                <a onClick={this.logout} className="menu-item" href="">Logout</a>
            </Menu>

        )
    }
}

export default Navbar;