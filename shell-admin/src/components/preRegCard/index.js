import React, { Component } from 'react';
import './style.css';

const Card = (props) => {

    // console.log(props.data)

    /** 
     * return list of arr item components
     *@param [arr] - card property
     */
    let displayList = (arr) => {
        checkData(arr)
        arr.map((curr) => (<li className="pre-reg-list-item">{curr}</li>))
    }

    /** 
     * check if array is null
     *@param [arr] - card property
     */
    let checkData = (arr) => ((arr === null || undefined ? new Array().push("none selected") : arr))

    let { fname, lname, message, workshops, activities, swags, hardwares } = props.data;
    let cardNum = props.counter;

    return (
        <div className="pre-reg-card-container">

            <ul className="pre-reg-card-list">
                <li className="pre-reg-card-list-item pre-reg-card-counter"><span className="pre-reg-card-list-item-label">Count: </span>{cardNum}</li>

                <li className="pre-reg-card-list-item"><span className="pre-reg-card-list-item-label">First Name:</span> {fname}</li>

                <li className="pre-reg-card-list-item"><span className="pre-reg-card-list-item-label">Last Name:</span> {lname}</li>

                <li className="pre-reg-card-list-item"><span className="pre-reg-card-list-item-label"><br />Message<br /></span> {message}</li>

                {/* <label className="pre-reg-card-list-item-label">Workshops</label>
                {displayList(workshops)}

                <label className="pre-reg-list-item-label">Hardware</label>
                {displayList(hardwares)}

                <label className="pre-reg-card-list-item-label">Activities</label>
                {displayList(activities)}

                <label className="pre-reg-card-list-item-label">Swag</label>
                {displayList(swags)} */}

            </ul>
        </div>
    )

}

export default Card;