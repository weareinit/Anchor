import React,{Component,Fragment} from 'react';
import ReactPaginate from 'react-paginate';

import './style.css';

import Hacker from '../../components/hacker';
import Navbar from '../../components/navbar';

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

    /**
     * Initially calls applicants service with page 0 and no query
     */
    async componentDidMount(){
        const{history} = this.props;
        
        try{
        const response = await Admin.getApplicants(0,null,history);
        const{applicants,overallPages,count} = response;

        this.setState({count,overallPages,applicants});
       
        }catch(e){
            console.log(e);
        }
    }

   /**
    * Calls applicants service with a query string
    */
    hackerSearch = async () => { 
       const{q} = this.state;
       const{history} = this.props;

       try{
           const response = await await Admin.getApplicants(0,q,history);
           const{applicants,overallPages,count} = response

        this.setState({count,overallPages,applicants,page:0})

       }catch(e){
           console.log(e);
       }
       
    }

    /**
     * Calls applicants service with page number
     * @param {data} data - Value from react-paginate
     */
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
                        <div className="filters">
                            <button onClick = {this.hackerSearch} className="searchBtn">Search</button>
                            {/* <label><input id="accepted" type="checkbox"/> Accepted</label> */}
                        </div>
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