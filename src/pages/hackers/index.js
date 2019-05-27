import React,{Component,Fragment} from 'react';
import ReactPaginate from 'react-paginate';

import './style.css';

import Hacker from '../../components/hacker';
import Navbar from '../../components/navbar';
import ConfirmModal from '../../components/confirmModal';

import Admin from '../../services/admin';

class Hackers extends Component{
    constructor(props){
        super(props)

        this.state = {
            allApplicants: null,
            applicants: null,
            q: '',
            page: 0,
            overallPages: null,
            count: null,
            filter: '',
            openModal: null,
            shellIDs: null
        }
    }

    /**
     * Initially calls applicants service with page 0 and no query
     */
    async componentDidMount(){
        const{history} = this.props;
        
        try{
        const response = await Admin.getApplicants(0,null,history);
        const{applicants,overallPages,count,allApplicants} = response;

        this.setState({count,overallPages,applicants,allApplicants});
       
        }catch(e){
            console.log(e);
        }
    }

   /**
    * Calls applicants service with a query string
    */
    hackerSearch = async () => { 
       const{q,filter} = this.state;
       const{history} = this.props;

       try{
           const response = await await Admin.getApplicants(0,q,history,filter);
           const{applicants,overallPages,count,allApplicants} = response

        this.setState({count,overallPages,applicants,allApplicants,page:0})

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
        const{q,filter} = this.state;

        const response = await Admin.getApplicants(selected,q,history,filter);
        const{applicants,allApplicants} = response

        this.setState({applicants,allApplicants});
    }

    acceptAll = async () => {
        const{allApplicants} = this.state;
        let shellIDs = [];

        allApplicants.map(applicant => {
            const {shellID} = applicant;
            shellIDs.push(shellID);
        })

        this.setState({shellIDs,openModal: true});
    }

    handleInputChange(property) {
        return e => {
          this.setState({
            [property]: e.target.value
          });
        };
      }

    toggleChange = (event) => {
        const{value} = event.target

        this.setState({filter:value});
    }

    render(){
        const{applicants,overallPages,count,openModal,shellIDs} = this.state;
        const{history} = this.props;

        return(
            applicants ?
            <div>
                <Navbar />
                    <div className="hackerOuter">
                    <ConfirmModal close = {() => this.setState({openModal:false})} action={() => Admin.acceptHacker(shellIDs)} open ={openModal} description = "accept all hackers" />
                        <input 
                        onChange = {this.handleInputChange('q')} 
                        placeholder="Search for hacker" 
                        className="hackerInput" 
                        type='text'
                        />
                        <br />
                            <button onClick = {this.hackerSearch} className="searchBtn">Search</button>
                        <div onChange={this.toggleChange} className="filters">
                            <label><input defaultChecked value={null} name="hackerFilter" className="toggle" type="radio"/> All</label>
                            <label><input name="hackerFilter" value="applied" className="toggle" type="radio"/> Applied</label>
                            <label><input name="hackerFilter" value="accepted" className="toggle" type="radio"/> Accepted</label>
                            <label><input name="hackerFilter" value="confirmed" className="toggle" type="radio"/> Confirmed</label>
                        </div>
                        <h2>{count} Hackers Found</h2>
                        <button onClick={this.acceptAll} className="allBtn">Accept All</button>
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