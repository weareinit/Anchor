import React, { Component } from 'react';
import './style.css';

const Card = (props) => {

    /** 
     * return list of arr item components
     *@param [arr] - card property
     */
    function displayList(arr) {

        let cleanArr = checkData(arr);

        return cleanArr.map((curr, i) => {
            if (i === cleanArr.length - 1)
                return curr
            else return (curr + ', ')
        })
    }

    /** 
     * check if array is null
     *@param [arr] - card property
     */
    function checkData(arr) {
        let newArr = ["Non-Selected"];

        return arr || newArr;
    }

    let { fname, lname, message, workshop, activities, swag, hardware, email } = props.data;
    let cardNum = props.counter;

    return (
        <div className="pre-reg-card-container">

            <ul className="pre-reg-card-list">
                <li ><span className="pre-reg-card-name">{fname} {lname} </span> <br />number: {cardNum}</li>
                <li className="pre-reg-card-list-item"><span className="pre-reg-card-list-item-label"><br />Email<br /></span> {email}<br /></li>
                <li className="pre-reg-card-list-item"><span className="pre-reg-card-list-item-label"><br />Message<br /></span> {message}<br /></li>

                <label className="pre-reg-card-list-item-label"><br />Workshops</label>
                <li className="pre-reg-card-list-item"> {displayList(workshop)}</li>

                <label className="pre-reg-card-list-item-label"><br />Hardware</label>
                <li className="pre-reg-card-list-item"> {displayList(hardware)}</li>

                <label className="pre-reg-card-list-item-label"><br />Activities</label>
                <li className="pre-reg-card-list-item"> {displayList(activities)}</li>

                <label className="pre-reg-card-list-item-label"><br />Swag</label>
                <li className="pre-reg-card-list-item"> {displayList(swag)}</li>

            </ul>
        </div>
    )

}

export default Card;