import React,{Component} from 'react';
import Modal from 'react-modal';

import './style.css';

const modalStyles = {
    content:{
        'font-size': 20,
        backgroundColor: 'rgba(206, 188, 143, .9)',
        border: '2px solid black',
        height: '30%',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
}

class ConfirmModal extends Component{
    constructor(props){
        super(props);

        this.state = {
            modalOpen: false
        }
    }

    closeModal = () => {
        this.setState({modalOpen: false})
    }

    componentWillReceiveProps(){
        const{open} = this.props;
    
        this.setState({modalOpen:open})
    }

    modalAction = async () => {
        const{action} = this.props;

        await action();
        this.closeModal();
    }

    render(){
        const{description} = this.props;

        return(
            <Modal 
                isOpen = {this.state.modalOpen}
                onRequestClose = {this.closeModal}
                contentLabel = 'Example Modal'
                style = {modalStyles}
                >
                    <h2>Are you sure you want to {description}? </h2>
                    <div className="modalBtns">
                        <button onClick={this.modalAction}>Yes</button>
                        <button onClick={this.closeModal}>No</button>
                    </div>
            </Modal>
        )
    }
}

export default ConfirmModal;