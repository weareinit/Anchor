import React,{Component} from 'react';

import Navbar from '../../components/navbar';

class Statistics extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Navbar />
                <h1>Statistics page</h1>
            </div>
        )
    }
}

export default Statistics