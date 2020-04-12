import React, { Component } from 'react'
import paymaya from 'paymaya-js-sdk'
import Modal from 'react-responsive-modal'

import { isEmptyObject } from '../../utils'

class SinglePayment extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false, 
            loading: false,
            requestReferenceNumber: "6319921",
            items: [
                {
                    name: "Nike Footwear",
                    quantity: 1,
                    totalAmount: {
                        value: '100'
                    }
                }
    
            ],
            totalAmount: {
                value: '100',
                currency: 'PHP',
            },
            metadata: {},
            redirectUrl: {
                success: "http://localhost:3000/success",
                failure: "http://localhost:3000/failure",
                cancel: "http://localhost:3000/cancel"
            },
            bodyResponse: {},
            errorResponse: {}
        }
    }

    async createSinglePayment(response){
        this.setState({
            loading: true,
            errorResponse: {}
        })
        paymaya.init('pk-MOfNKu3FmHMVHtjyjG7vhr7vFevRkWxmxYL1Yq6iFk5', true)
        await paymaya.createSinglePayment(response).then().catch(err => {
            this.setState({
                errorResponse: err,
                loading: false
            })
        })
    }
    
    onCloseModal = () => {
        this.setState({
            open: false,
            bodyResponse: {},
            errorResponse: {},
            loading: false
        })
    }

    handleSinglePayment = () => {
        
        const { requestReferenceNumber, totalAmount, metadata, redirectUrl } = this.state

        const bodyResponseForSinglePayment = {
            requestReferenceNumber,
            totalAmount,
            metadata,
            redirectUrl
            
        }

        this.setState({
            bodyResponse: bodyResponseForSinglePayment,
            open: true
        })
          
    }

    render() {
        const { bodyResponse, errorResponse, open, loading } = this.state
        return (
            <div>
                <div className="form">
                    <h2>Single payment</h2>
                    <button onClick={this.handleSinglePayment} type="button">Submit</button>
                </div>
                <Modal
                    open={open}
                    onClose={this.onCloseModal}

                >
                    {!isEmptyObject(bodyResponse) && <pre>{JSON.stringify(bodyResponse, null, 2)}</pre>}
                    {!isEmptyObject(errorResponse) && <pre style={{backgroundColor: 'red', color: '#ffffff'}}>{JSON.stringify(errorResponse, null, 2)}</pre>}
                    <div style={{display: 'flex', justifyContent: 'center', margin: '0 auto'}} className="form">
                    {!loading && <button onClick={() => this.createSinglePayment(bodyResponse)} type="button">OK</button> }
                    {loading && <img src="/img/loading.gif" alt="" /> }
                    </div>
                </Modal>
            </div>
        );
    }
}
  
export default SinglePayment;