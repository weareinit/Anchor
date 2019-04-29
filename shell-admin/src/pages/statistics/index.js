import React,{Component} from 'react';

import Navbar from '../../components/navbar';
import Statistic from '../../components/statistic';
import Admin from '../../services/admin';

import './style.css';

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
        const statistics = await Admin.getStatistics(history);

        this.setState({statistics})
       
        }catch(e){
            console.log(e);
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