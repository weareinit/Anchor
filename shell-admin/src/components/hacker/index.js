import React,{Component} from 'react';
import Modal from 'react-modal';

import './style.css'

const modalStyles = {
    content:{
        'font-size': 20,
        backgroundColor: 'rgba(206, 188, 143, .8)',
        border: '2px solid black',
    },
}

class Hacker extends Component{
    constructor(props){
        super(props)

        this.state = {
            modalOpen: false
        }
    }

    openModal = () => {
        this.setState({modalOpen: true})
    }

    cloaseModal = () => {
        this.setState({modalOpen:false})
    }

    render(){
        const{firstName,lastName,email,schoolName, applicationStatus,dob,
              gender,github,linkedIn,graduationYear,levelOfStudy,major,needReimbursement,
              race,shirtSize,phoneNumber} = this.props.data
        return(
            <div className="hackerContainer">
                <h1>{firstName} {lastName}</h1>
                <p>• Email: {email}</p>
                <p>• School: {schoolName}</p>
                {/* <p>Location: Miami,Fl</p> */}
                <p>• Application Status: {applicationStatus}</p>
                <button onClick={this.openModal}>More Info</button>
                <button className="acceptBtn">Accept</button>
                <Modal 
                isOpen = {this.state.modalOpen}
                onRequestClose = {this.cloaseModal}
                contentLabel = 'Example Modal'
                style = {modalStyles}
                >
                    <h1>{firstName} {lastName}</h1>
                    <p>• Email: {email}</p>
                    <p>• School: {schoolName}</p>
                    <p>• Major: {major}</p>
                    <p>• Graduation Year: {graduationYear}</p>
                    <p>• Level of Study: {levelOfStudy}</p>
                    <p>• Date of Birth: {dob}</p>
                    <p>• Gender: {gender}</p>
                    <p>• Race: {race}</p>
                    <p>• Phone: {phoneNumber}</p>
                    <p>• Needs Reimbursement: {needReimbursement}</p>
                    <p>• Shirt Size: {shirtSize}</p>
                    <p>• GitHub: {github}</p>
                    <p>• LinkedIn: {linkedIn}</p>
                </Modal>
            </div>
        )
    }
}

export default Hacker;