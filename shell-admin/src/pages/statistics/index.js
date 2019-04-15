import React,{Component} from 'react';
import axios from 'axios';

import Navbar from '../../components/navbar';
import Statistic from '../../components/statistic';
import {getStatistics} from '../../utils/registrationStatistics';

import './style.css';

const SERVER_URL = "http://e2797737.ngrok.io"

class Statistics extends Component{
    constructor(props){
        super(props)

        this.state = {
            statistics: null,
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

        const statistics = await getStatistics(applicants);

        this.setState({statistics})

        console.log(this.state.statistics);
       
        }catch(e){
            console.log(e)
            alert('Unauthorized, please login')
            await localStorage.setItem("token",null)
            this.props.history.push('/')
        }
    }

    render(){
        const{statistics} = this.state

        return(
            statistics ?
            <div>
                <Navbar />
                <div className="statisticsOuter">
                    <h1>Registration Statistics</h1>
                </div>
                <div className='statisticsContainer'>
                    {statistics.map(stat => {
                        return <Statistic name = {stat.key} value = {stat.value} />
                    })}
                    {/* <Statistic name= "Not Applied" value = {notApplied}/> */}
                </div>
            </div>
            :
            <div className="statisticsOuter">
                <h1>Loading...</h1>
            </div>
        )
    }
}

export default Statistics