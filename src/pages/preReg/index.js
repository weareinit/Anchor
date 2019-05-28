import React, { Component } from 'react';
import './style.css';
import Navbar from '../../components/navbar';
import Card from '../../components/preRegCard';
import Admin from '../../services/admin';



class PreRegistration extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            data: {},
            total: 0,

        }
    }

    /**
     * get pre-registered applicants on mount
     */
    async componentDidMount() {
        const { history } = this.props;

        try {
            const response = await Admin.getPreReg(history);

            await this.setState({ loading: !this.state.loading, data: response, total: Object.keys(response).length })
        } catch (e) {
            console.log(e);
        }
    }


    render() {

        const { history } = this.props;
        
        let objArr = this.state.data;

        let display = () => {
            try {
                let myData = Object.keys(objArr);

                return myData.map((curr, i) => { return <Card key={curr} counter={i + 1} data={objArr[curr]} /> })
            } catch (err) {
                alert("something went wrong!!\n" + err)
            }
        }
        return (
            this.state.loading ?
                <div className="pre-reg-container">
                    <Navbar />
                    <h1 className="pre-reg-total-hackers">Total Pre Registered Hackers:  {this.state.total}</h1>
                    <div className="pre-reg">
                        {display()}
                    </div>

                </div>
                :
                <div className="hackerOuter">
                    <h1 id="loading">Loading...</h1>
                </div>
        );
    }
}

export default PreRegistration;