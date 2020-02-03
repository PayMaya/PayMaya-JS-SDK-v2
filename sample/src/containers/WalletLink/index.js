import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

import PayMayaClientSDK from 'paymaya-sdk'

import { isEmptyObject } from '../../utils'

class WalletLink extends Component {
    constructor(props){
        super(props);
        this.state = {
            bodyResponseForWalletLink: {}
        }
    }

    async createWalletLink(response){
        const publicKey = 'pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah';
        const sdk = new PayMayaClientSDK(publicKey, true);
        await sdk.createWalletLink(response)
    }

    handleWalletLink = (values) => {

        const bodyResponseForWalletLink = {
            requestReferenceNumber: values.requestReferenceNumber
        }
        
        this.setState({
            bodyResponseForWalletLink
        }, () => {
            console.log(bodyResponseForWalletLink)
            setTimeout( () => {
                alert('To run Wallet link method for PayMaya SDK')
                this.createWalletLink(bodyResponseForWalletLink).then().catch(err => {
                    this.setState({
                        bodyResponseForWalletLink: err
                    }, () => {
                        console.log(err)
                    })
                })
            }, 2000)
        })
        
    }
    render() {
        const { handleSubmit } = this.props
        const { bodyResponseForWalletLink } = this.state
        return (
            <div className="form">
                <h1>Wallet link</h1>
                <a
                    href="https://s3-us-west-2.amazonaws.com/developers.paymaya.com.pg/pay-by-paymaya/index.html#wallet-payment-recurring-payment-post"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    PayMaya Wallet link Api
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