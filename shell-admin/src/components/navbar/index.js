import React,{Component,Fragment} from 'react';

import {slide as Menu} from 'react-burger-menu';
import Shell from '../../assets/Shell.png'

import Admin from '../../services/admin';

import styles from './style';

class Navbar extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        
    }
    
    logout = async () => {
        const{history} = this.props;
        
        await Admin.logout(history);
    }
    
    render(){
       
        return(
            <Menu styles = {styles}>
                <img style = {styles.shell} src={Shell}/>
                <a id="home" className="menu-item" href="/hackers">Hackers</a>
                <a id="statistics" className="menu-item" href="/statistics">Statistics</a>
                <a id="reminders" className="menu-item" href="/reminders">Reminders</a>
                <a id="notifications" className="menu-item" href='/notifications'>Notifications</a>
                <a onClick={this.logout} className="menu-item" href="">Logout</a>
            </Menu>

        )
    }
}

export default Navbar;