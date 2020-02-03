import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

import PayMayaClientSDK from 'paymaya-sdk'

import { isEmptyObject } from '../../utils'

class Checkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            bodyResponseForCheckout: {}
        }
    }


    async createCheckout(response){
        const publicKey = 'pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah';
        const sdk = new PayMayaClientSDK(publicKey, true);
        await sdk.createCheckout(response)
    }

    handleCheckout = (values) => {

        const totalAmount = {
            value: values.value,
            currency: values.currency,
        }

        const items = [
            {
                name: values.name,
                quantity: values.quantity,
                totalAmount: {
                    value: values.value
                }
            }

        ]

        const bodyResponseForCheckout = {
            totalAmount: {...totalAmount},
            items,
            requestReferenceNumber: values.requestReferenceNumber
        }
        

        this.setState({
            bodyResponseForCheckout
        }, () => {
            console.log(bodyResponseForCheckout)
            setTimeout( () => {
                alert('To run Checkout method for PayMaya SDK')
                this.createCheckout(bodyResponseForCheckout).then().catch(err => {
                    this.setState({
                        bodyResponseForCheckout: err
                    }, () => {
                        console.log(err)
                    })
                })
            }, 2000)

        })
        
    }
    render() {
        const { handleSubmit } = this.props
        const { bodyResponseForCheckout } = this.state
        return (
            <div className="form">
                <h1>Checkout</h1>
                <a
                    href="https://s3-us-west-2.amazonaws.com/developers.paymaya.com.pg/checkout/v2/Checkout+API.html#environment-setup"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    PayMaya Checkout Doc
                </a>
                <a
                    href="https://s3-us-west-2.amazonaws.com/developers.paymaya.com.pg/checkout/checkout.html#checkout-payment-page-checkout-endpoints"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    PayMaya Checkout Api
                </a>
                <a
                    href="https://developers.paymaya.com/blog/entry/paymaya-checkout-api-overview#apiObjects"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    PayMaya Checkout Api Overview
                </a>

                
                <form
                    onSubmit={handleSubmit(this.handleCheckout)}
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
                    <h2>Items</h2>
                    <div>
                        <label htmlFor="name">Name</label>
                        <Field name="name" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                        <Field name="quantity" component="input" type="text" />
                    </div>
                    <h2>Unique reference number</h2>
                    <div>
                        <label htmlFor="requestReferenceNumber">Reference number</label>
                        <Field name="requestReferenceNumber" component="input" type="text" />
                    </div>
                    
                    <button type="submit">Submit</button>
                    {!isEmptyObject(bodyResponseForCheckout) && <pre>{JSON.stringify(bodyResponseForCheckout, null, 2)}</pre>}
                </form>
            </div>
        );
    }
}

Checkout = reduxForm({
    form: 'checkout',
    initialValues: {
        value: 100,
        currency: "PHP",
        name: "Canvas Slip Ons",
        quantity: 1,
        requestReferenceNumber: "1551191039"

    }
})(Checkout)
  
export default Checkout;