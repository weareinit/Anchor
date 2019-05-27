import React from 'react';

import './style.css'

const Statistic = ({name,value}) => {
    return(
        <div className="statisticContainer">
            <h2>{name}</h2>
            <p>{value}</p>
        </div>
    )
}

export default Statistic