import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

import PayMayaClientSDK from 'paymaya-sdk'

import { isEmptyObject } from '../../utils'

class SinglePayment extends Component {
    constructor(props){
        super(props);
        this.state = {
            bodyResponseForSinglePayment: {}
        }
    }

    async createSinglePayment(response){
        const publicKey = 'pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah';
        const sdk = new PayMayaClientSDK(publicKey, true);
        await sdk.createSinglePayment(response)
    }

    handleSinglePayment = (values) => {
        const totalAmount = {
            value: values.value,
            currency: values.currency,
        }

        const bodyResponseForSinglePayment = {
            totalAmount: {...totalAmount},
            requestReferenceNumber: values.requestReferenceNumber
        }

        this.setState({
            bodyResponseForSinglePayment
        }, () => {
            console.log(bodyResponseForSinglePayment)
            setTimeout( () => {
                alert('To run Single payment method for PayMaya SDK')
                this.createSinglePayment(bodyResponseForSinglePayment).then().catch(err => {
                    this.setState({
                        bodyResponseForSinglePayment: err
                    }, () => {
                        console.log(err)
                    })
                })
            }, 2000)
        })
        
    }
    render() {
        const { handleSubmit } = this.props
        const { bodyResponseForSinglePayment } = this.state
        return (
            <div className="form">
                <h1>Single payment</h1>
                <a
                    href="https://s3-us-west-2.amazonaws.com/developers.paymaya.com.pg/pay-by-paymaya/index.html#wallet-payment-single-payment-post"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    PayMaya Single payment Api
                </a>
                <form
                    onSubmit={handleSubmit(this.handleSinglePayment)}
                    noValidate
                    autoComplete="off"
                >
                    <h2>Total amount</h2>
                    <div>
                        <label htmlFor="value">Value</label>
                        <Field name="value" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="currency">Currency</label>
                        <Field name="currency" component="input" type="text" />
                    </div>
                    <h2>Unique reference number</h2>
                    <div>
                        <label htmlFor="requestReferenceNumber">Reference number</label>
                        <Field name="requestReferenceNumber" component="input" type="text" />
                    </div>
                    
                    <button type="submit">Submit</button>
                    {!isEmptyObject(bodyResponseForSinglePayment) && <pre>{JSON.stringify(bodyResponseForSinglePayment, null, 2)}</pre>}
                </form>
            </div>
        );
    }
}

SinglePayment = reduxForm({
    form: 'singlePayment',
    initialValues: {
        value: 100,
        currency: "PHP",
        requestReferenceNumber: "1551191039"

    }
})(SinglePayment)
  
export default SinglePayment;