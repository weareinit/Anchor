import React,{Component} from 'react';
import Modal from 'react-modal';

import Admin from '../../services/admin';
import ConfirmModal from '../confirmModal';

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
            modalOpenConfirm: false
        }
    }

    openModal = () => {
        this.setState({modalOpen: true})
        console.log(this.props.data);
    }

    closeModal = () => {
        this.setState({modalOpen:false})
    }

    accept = async () => {

        this.setState({ modalOpenConfirm: true })
        //await Admin.acceptHacker(idArr,history);
    }

    checkIn = async () => {
        const{history,data} = this.props;
        const{shellID} = data;

        await Admin.checkIn(shellID,history);

    }

    render(){
        const{firstName,lastName,email,schoolName, applicationStatus,dob,
              gender,github,linkedIn,graduationYear,levelOfStudy,major,needReimbursement,
              race,shirtSize,phoneNumber,checkIn, howDidYouHear, reasonForAttending, resume, areaOfFocus} = this.props.data;

        const { modalOpenConfirm } = this.state;

        const{history,data} = this.props;
        const {shellID} = data;
        const idArr = [shellID]

        const acceptBtn = applicationStatus === 'accepted' ? null : <button onClick={this.accept} style={disabledStyle} className="acceptBtn">Accept</button>

        return(
            <div className="hackerContainer">
                <ConfirmModal close = {() => this.setState({modalOpenConfirm:false})} action={() => Admin.acceptHacker(idArr,history)} open ={modalOpenConfirm} description = {`accept ${firstName} ${lastName}`}/>
                <h1>{firstName} {lastName}</h1>
                <p>• Email: {email}</p>
                <p>• Application Status: {applicationStatus}</p>
                <button onClick={this.openModal}>More Info</button>
                {acceptBtn}
                <button onClick={this.checkIn} className="acceptBtn">Check In</button>
                <Modal 
                isOpen = {this.state.modalOpen}
                onRequestClose = {this.closeModal}
                contentLabel = 'Example Modal'
                style = {modalStyles}
                >
                    <h1>{firstName} {lastName}</h1>
                    <p>• Email: {email}</p>
                    <p>• School: {schoolName}</p>
                    <p>• Major: {major}</p>
                    <p>• Area of focus: {areaOfFocus}</p>
                    <p>• Checked In: {checkIn ? 'Yes':'No'}</p>
                    <p>• Graduation Year: {graduationYear}</p>
                    <p>• Level of Study: {levelOfStudy}</p>
                    <p>• Date of Birth: {dob}</p>
                    <p>• Gender: {gender}</p>
                    <p>• Race: {race}</p>
                    <p>• Phone: {phoneNumber}</p>
                    <p>• Needs Reimbursement: {needReimbursement}</p>
                    <p>• Shirt Size: {shirtSize}</p>
                    <p>• GitHub: <a href={github} target="_blank">{github}</a></p>
                    <p>• LinkedIn: <a href={linkedIn} target="_blank">{linkedIn}</a></p>
                    <p>• Resume: <a href={resume} target="_blank">{resume ? 'Drive link' : null}</a></p>
                    <p>• How did you hear?: {howDidYouHear}</p>
                    <p>• Reason for attending?: {reasonForAttending}</p>
                </Modal>
            </div>
        );
    }
}

export default Hacker;