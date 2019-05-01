import React,{Component,Fragment} from 'react';
import ReactPaginate from 'react-paginate';

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
            q: '',
            page: 0,
            overallPages: null,
            count: null
        }
    }

    async componentDidMount(){
        const{history} = this.props;
        
        try{
        const response = await Admin.getApplicants(0,null,history);
        const{applicants,overallPages,count} = response

        this.setState({count,overallPages,applicants})
       
        }catch(e){
            console.log(e);
        }
    }

    /*
     changes hacker state to hold array of applicants whose match with some field
     in the search query
    */
    hackerSearch = async () => { 
       const{q} = this.state;
       const{history} = this.props;

       try{
           const response = await await Admin.getApplicants(0,q,history);
           const{applicants,overallPages,count} = response

        this.setState({count,overallPages,applicants})

       }catch(e){
           console.log(e);
       }
       
    }

    handlePageClick = async data => {
        const{history} = this.props;
        const{selected} = data;
        const{q} = this.state;

        const response = await Admin.getApplicants(selected,q,history);
        const{applicants} = response

        this.setState({applicants})
        console.log(this.state.applicants)
    }

    handleInputChange(property) {
        return e => {
          this.setState({
            [property]: e.target.value
          });
        };
      }

    render(){
        const{applicants,overallPages,count} = this.state;
        const{history} = this.props;

        return(
            applicants ?
            <div>
                <Navbar />
                    <div className="hackerOuter">
                        <input 
                        onChange = {this.handleInputChange('q')} 
                        placeholder="Search for hacker" 
                        className="hackerInput" 
                        type='text'
                        />
                        <br />
                        <button onClick = {this.hackerSearch} className="searchBtn">Search</button>
                        <h2>{count} Hackers Found</h2>
                        <button className="allBtn">Accept All</button>
                        <div className="hackersContainer">
                            {applicants.map(hacker => {
                                return <Hacker history={history} data = {hacker} />
                            })}
                        </div>
                        <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={overallPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'react-paginate'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                        />
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