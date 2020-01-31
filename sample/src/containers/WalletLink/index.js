import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

import { isEmptyObject } from '../../utils'

class WalletLink extends Component {
    constructor(props){
        super(props);
        this.state = {
            bodyResponseForWalletLink: {}
        }
    }

    handleWalletLink = (values) => {

        const bodyResponseForWalletLink = {
            requestReferenceNumber: values.requestReferenceNumber
        }
        

        this.setState({
            bodyResponseForWalletLink
        }, () => {
            console.log(bodyResponseForWalletLink)
        })
        
    }
    render() {
        const { handleSubmit } = this.props
        const { bodyResponseForWalletLink } = this.state
        return (
            <div className="form">
                <h1>Single payment</h1>
                <a
                    href="https://s3-us-west-2.amazonaws.com/developers.paymaya.com.pg/pay-by-paymaya/index.html#wallet-payment-recurring-payment-post"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    PayMaya Single payment Api
                </a>
                <form
                    onSubmit={handleSubmit(this.handleWalletLink)}
                    noValidate
                    autoComplete="off"
                >
                    <h2>Unique reference number</h2>
                    <div>
                        <label htmlFor="requestReferenceNumber">Reference number</label>
                        <Field name="requestReferenceNumber" component="input" type="text" />
                    </div>
                    
                    <button type="submit">Submit</button>
                    {!isEmptyObject(bodyResponseForWalletLink) && <pre>{JSON.stringify(bodyResponseForWalletLink, null, 2)}</pre>}
                </form>
            </div>
        );
    }
}

WalletLink = reduxForm({
    form: 'walletLink',
    initialValues: {
        requestReferenceNumber: "1551191039"

    }
})(WalletLink)
  
export default WalletLink;