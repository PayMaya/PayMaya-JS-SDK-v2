import React, { Component } from 'react'

class PaymentVault extends Component {
    render() {
        return (
            <div className="form">
                <h1>Payment Vault</h1>
                <a
                    href="https://s3-us-west-2.amazonaws.com/developers.paymaya.com.pg/payment-vault/paymentvault.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    PayMaya Payment Vault Api
                </a>
            </div>
        );
    }
}
export default PaymentVault;