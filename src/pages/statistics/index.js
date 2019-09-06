import React,{Component} from 'react';

import './style.css';

import Navbar from '../../components/navbar';
import Statistic from '../../components/statistic';
import { Bar } from 'react-chartjs-2';
import zoom from 'chartjs-plugin-zoom';

import Admin from '../../services/admin';

class Statistics extends Component{
    constructor(props){
        super(props)

        this.state = {
            statistics: null,
            chartLabels: null,
            chartData: null
        }
    }

    /**
     * Calls statistics service
     */
    async componentDidMount(){
        const{history} = this.props;

        try{
        const {stats:statistics, sortedSchools} = await Admin.getStatistics(history);
        const chartLabels = [];
        const chartData = [];

        for(let i = 0; i < 15; i++){
          const [school, data] = sortedSchools[i];
          chartLabels.push(school);
          chartData.push(data);
        };
        
        this.setState({statistics, chartData, chartLabels});
       
        }catch(e){
            console.log(e);
        }
    }

    render(){
        const{ statistics, chartData, chartLabels} = this.state;
        const data = {
          labels: chartLabels,
          datasets: [{
              label: 'Applicants',
              data: chartData,
              borderWidth: 1
          }]
      }
        return(
            statistics ?
            <div>
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
              <h2 style={{marginLeft: '5%'}}>Top Schools</h2>
                  <div className = 'chart col-md-4'>
                  <Bar
                      data={data}
                      width={4000}
                      height={500}
                      options={{ maintainAspectRatio: false, responsive:false }}
                    />
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