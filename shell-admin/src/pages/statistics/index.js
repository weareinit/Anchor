import React,{Component} from 'react';

import Navbar from '../../components/navbar';
import Statistic from '../../components/statistic';
import {getStatistics} from '../../utils/registrationStatistics';

import Admin from '../../services/admin';

import './style.css';

import authFailure from '../../utils/auth';

class Statistics extends Component{
    constructor(props){
        super(props)

        this.state = {
            statistics: null,
        }
    }

    async componentDidMount(){
        const{history} = this.props;

        try{
        const applicants = await Admin.getApplicants();

        const statistics = await getStatistics(applicants);

        this.setState({statistics})
       
        }catch(e){
            authFailure(history);
        }
    }

    render(){
        const{statistics} = this.state;

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
        );
    }
}

export default Statistics;