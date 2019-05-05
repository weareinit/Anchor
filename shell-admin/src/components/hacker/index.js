import React,{Component} from 'react';
import Modal from 'react-modal';

import Admin from '../../services/admin';

import './style.css'

const modalStyles = {
    content:{
        'font-size': 20,
        backgroundColor: 'rgba(206, 188, 143, .9)',
        border: '2px solid black',
    },
}

const disabledStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
}

class Hacker extends Component{
    constructor(props){
        super(props)

        this.state = {
            modalOpen: false,
        }
    }

    openModal = () => {
        this.setState({modalOpen: true})
    }

    cloaseModal = () => {
        this.setState({modalOpen:false})
    }

    accept = async () => {
        const{history,data} = this.props;
        const {shellID} = data;
        
        const idArr = [shellID]
        console.log(shellID);

        await Admin.acceptHacker(idArr,history);
        

    }

    checkIn = async () => {
        const{history,data} = this.props;
        const{shellID} = data;

        await Admin.checkIn(shellID,history);

    }

    render(){

        const{firstName,lastName,email,schoolName, applicationStatus,dob,
              gender,github,linkedIn,graduationYear,levelOfStudy,major,needReimbursement,
              race,shirtSize,phoneNumber,checkIn} = this.props.data

        return(
            <div className="hackerContainer">
                <h1>{firstName} {lastName}</h1>
                <p>• Email: {email}</p>
                {/* <p>• School: {schoolName}</p> */}
                {/* <p>Location: Miami,Fl</p> */}
                <p>• Application Status: {applicationStatus}</p>
                <button onClick={this.openModal}>More Info</button>
                <button onClick={this.accept} style={disabledStyle} className="acceptBtn">Accept</button>
                <button onClick={this.checkIn} className="acceptBtn">Check In</button>
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
                    <p>• Checked In: {checkIn ? 'Yes':'No'}</p>
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
        );
    }
}

export default Hacker;