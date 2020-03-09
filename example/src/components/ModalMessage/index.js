import React, { Component } from 'react'
import Modal from 'react-responsive-modal'

class ModalMessage extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    componentDidMount(){
        this.setModal(true)
    }

    setModal = (value) => {
        this.setState({
            open: value
        })
    }

    setBackground = (type) => {
        switch(type){
            case 'success':
                return '#4caf50'
            case 'failure':
                return '#f44336'
            case 'cancel':
                return '#ff9800'
            default:
                return '#8dc540'
        }
    }

    onCloseModal = () => {
        this.props.history.push('payment-methods')
        this.setModal(false)
    }

    render() {
        const { type } = this.props
        const { open } = this.state
        return (
            <Modal
                open={open}
                onClose={this.onCloseModal}
                closeOnEsc={false}
                closeOnOverlayClick={false}
                >
                <img
                    style={{margin: '50px auto 50px'}}
                    src="/img/paymaya.png"
                    alt="PayMaya"
                />
                <div className="form"
                    style={{marginBottom: '50px'}}
                >
                    <button
                        style={{margin: '0 auto', display: 'block', backgroundColor: this.setBackground(type)}}
                        onClick={this.onCloseModal}
                        type="button"
                    >
                        {type}
                    </button>
                </div>
            </Modal>
        );
    }
}

export default ModalMessage;