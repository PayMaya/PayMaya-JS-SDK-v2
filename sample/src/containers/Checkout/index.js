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

    handleCheckout = (values) => {

        const publicKey = 'pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah';

        const sdk = new PayMayaClientSDK(publicKey, true);

        const details = {
            discount: values.discount,
            serviceCharge: values.serviceCharge,
            shippingFee: values.shippingFee,
            tax: values.tax,
            subtotal: values.subtotal
        }

        const totalAmount = {
            value: values.value,
            currency: values.currency,
            details: {...details},
        }

        const totalAmountForItems = {
            ...totalAmount,   
        }

        delete totalAmountForItems.currency;

        const items = [
            {
                name: values.name,
                quantity: values.quantity,
                code: values.code,
                description: values.description,
                amount: {
                    value: values.amountValue,
                    details: {...details}
                }
            },
            {
                totalAmount: {...totalAmountForItems}
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
            sdk.triggerCheckout(bodyResponseForCheckout)
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
                    <div>
                        <label htmlFor="discount">Discount</label>
                        <Field name="discount" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="serviceCharge">Service Charge</label>
                        <Field name="serviceCharge" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="shippingFee">Shipping Fee</label>
                        <Field name="shippingFee" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="tax">Tax</label>
                        <Field name="tax" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="subtotal">Subtotal</label>
                        <Field name="subtotal" component="input" type="text" />
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
                    <div>
                        <label htmlFor="code">Code</label>
                        <Field name="code" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <Field name="description" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="amountValue">Amount value</label>
                        <Field name="amountValue" component="input" type="text" />
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
        discount: 0,
        serviceCharge: 0,
        shippingFee: 0,
        tax: 0,
        subtotal: 0,
        name: "Canvas Slip Ons",
        quantity: 1,
        code: "CVG-096732",
        description: "Shoes",
        amountValue: 100,
        requestReferenceNumber: "1551191039"

    }
})(Checkout)
  
export default Checkout;