import React,{Component,Fragment} from 'react';
import axios from 'axios';

import Hacker from '../../components/hacker';
import './style.css';

import Navbar from '../../components/navbar';

import authFailure from '../../utils/auth';
import Admin from '../../services/admin';

class Hackers extends Component{
    constructor(props){
        super(props)

        this.state = {
            applicants: null,
            hackers: null,
        }
    }

    async componentDidMount(){
        const{history} = this.props;
        
        try{
        const applicants = await Admin.getApplicants();

        this.setState({applicants,hackers:applicants})
       
        }catch(e){
            authFailure(history);
        }
    }

    /*
     changes hacker state to hold array of applicants whose match with some field
     in the search query
    */
    hackerSearch = (event) => { 
       const{value} = event.target;
       const{applicants} = this.state;
       let arr = [];

        applicants.map(hacker => {
            for(let key in hacker){
                let hackerVal = hacker[key]

                if(hackerVal && String(hackerVal).toLowerCase().includes(String(value).toLowerCase())){
                    arr.push(hacker)
                    break;
                }
            }
        });

        this.setState({hackers:arr});
    }

    render(){
        const{hackers} = this.state;
        const{history} = this.props;

        return(
            hackers ?
            <div className="background">
                <Navbar />
                    <div className="hackerOuter">
                        <input 
                        onChange = {this.hackerSearch} 
                        placeholder="Search for hacker" 
                        className="hackerInput" 
                        type='text'
                        />
                        <h2>{hackers.length} Hackers Found</h2>
                        <button className="allBtn">Accept All</button>
                        <div className="hackersContainer">
                            {hackers.map(hacker => {
                                return <Hacker history={history} data = {hacker} />
                            })}
                        </div>
                    </div>
            </div>
            :
            <div className="hackerOuter">
                <h1 id="loading">Loading...</h1>
            </div>

        );
    }
}

export default Hackers;