import React, { Component } from 'react';
import './style.css';

const Card = (props) => {

    // console.log(props.data)

    /** 
     * return list of arr item components
     *@param [arr] - card property
     */
    let displayList = (arr) => {

        let cleanArr = checkData(arr);

        return cleanArr.map((curr, i) => (<li key={i} className="pre-reg-list-item">{curr}</li>))
    }

    /** 
     * check if array is null
     *@param [arr] - card property
     */
    let checkData = (arr) => {
        let newArr = [" "];

        return arr || newArr;
    }

    let { fname, lname, message, workshops, activities, swags, hardwares } = props.data;
    let cardNum = props.counter;

    return (
        <div className="pre-reg-card-container">

            <ul className="pre-reg-card-list">
                <li ><span className="pre-reg-card-name">{fname} {lname} </span> <br />number: {cardNum}</li>

                <li className="pre-reg-card-list-item"><span className="pre-reg-card-list-item-label"><br />Message<br /></span> {message}<br /></li>

                <label className="pre-reg-card-list-item-label">Workshops</label>
                {displayList(workshops)}

                <label className="pre-reg-card-list-item-label">Hardware</label>
                {displayList(hardwares)}

                <label className="pre-reg-card-list-item-label">Activities</label>
                {displayList(activities)}

                <label className="pre-reg-card-list-item-label">Swag</label>
                {displayList(swags)}

            </ul>
        </div>
    )

}

export default Card;