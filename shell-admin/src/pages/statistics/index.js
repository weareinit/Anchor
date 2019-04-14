import React,{Component} from 'react';
import axios from 'axios';

import Navbar from '../../components/navbar';
import Statistic from '../../components/statistic';
import {numApplied,numNotApplied,numApplicants} from '../../utils/registrationStatistics';

import './style.css';

const SERVER_URL = "http://35c58f01.ngrok.io"

class Statistics extends Component{
    constructor(props){
        super(props)

        this.state = {
            applicants: null,
            confirmed: null,
            applied: null,
            notApplied: null,
            done: false
        }
    }

    async componentDidMount(){
        try{
        const token = await localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization':'Bearer '+ token
            }
        }

        const {data} = await axios.get(SERVER_URL+"/application",config);
        const {applicants} = data.data

        const notApplied = numNotApplied(applicants);

        this.setState({done:true,notApplied})

        console.log(notApplied);
       
        }catch(e){
            console.log(e)
            alert('Unauthorized, please login')
            await localStorage.setItem("token",null)
            this.props.history.push('/')
        }
    }

    render(){
        const{done,notApplied} = this.state

        return(
            done ?
            <div>
                <Navbar />
                <div className="statisticsOuter">
                    <h1>Registration Statistics</h1>
                </div>
                <div className='statisticsContainer'>
                    <Statistic name= "Not Applied" value = {notApplied}/>
                </div>
            </div>
            :
            <div className="statisticsOuter">
                <h1>Loading</h1>
            </div>
        )
    }
}

export default Statistics