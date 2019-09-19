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
            modalOpenConfirm: false,
            action: null,
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
        this.setState({ action: 'accept' })
        this.setState({ modalOpenConfirm: true })
    }

    checkIn = async () => {
        const{history,data} = this.props;
        const{shellID} = data;

        await Admin.checkIn(shellID,history);
    }

    delete = async () => {
      this.setState({ action: 'delete' });
      this.setState({ modalOpenConfirm: true });
    }

    render(){
        const{firstName,lastName,email,schoolName, applicationStatus,dob,
              gender,github,linkedIn,graduationYear,levelOfStudy,major,needReimbursement,
              race,shirtSize,phoneNumber,checkIn, howDidYouHear, reasonForAttending, resume, 
              areaOfFocus, emailConfirmed, dietaryRestriction, emailConfirmationToken, walkIn } = this.props.data;

        const { modalOpenConfirm, action } = this.state;

        const {history,data} = this.props;
        const {shellID} = data;
        const idArr = [shellID]

        const acceptBtn = applicationStatus !== 'applied' ? null : <button onClick={this.accept} style={disabledStyle} className="acceptBtn">Accept</button>
        const checkInBtn = !checkIn && applicationStatus === 'confirmed' ? <button onClick={this.checkIn} className="acceptBtn">Check In</button> : null
        const func = action === 'accept' ? () => Admin.acceptHacker(idArr, history) : () => Admin.deleteOne(shellID, history);

        return(
            <div className="hackerContainer">
                <ConfirmModal close = {() => this.setState({modalOpenConfirm:false})} action={func} open ={modalOpenConfirm} description = {`${action} ${firstName} ${lastName}`}/>
                  <h1>{firstName} {lastName}</h1>
                <p>• Email: {email}</p>
                <p>• Application Status: {applicationStatus}</p>
                <button onClick={this.openModal}>Info</button>
                { acceptBtn }
                { checkInBtn }
                <button onClick={this.delete} className="acceptBtn">X</button>
                <Modal 
                isOpen = {this.state.modalOpen}
                onRequestClose = {this.closeModal}
                contentLabel = 'Example Modal'
                style = {modalStyles}
                >
                    <h1>{firstName} {lastName}</h1>
                    <p>• Email: {email}</p>
                    <p>• Email Confirmation Token: { emailConfirmationToken }</p>
                    <p>• Email Verified? { emailConfirmed === true ? 'Yes' : 'No' }</p>
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
                    <p>• Dietary Restrictions?: { dietaryRestriction }</p>
                    <p>• Walk In: {walkIn ? 'Yes' : 'No'}</p>
                </Modal>
            </div>
        );
    }
}

export default Hacker;