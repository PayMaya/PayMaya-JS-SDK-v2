export default class PayMayaClientSDK {
  constructor(publicKey, isSandbox) {
    // make sure its singleton
    if (!PayMayaClientSDK.instance) {
      PayMayaClientSDK.instance = this;
    }
    this.isSandbox = isSandbox;
    this.apiUrl = isSandbox ? 'https://pg-sandbox.paymaya.com' : 'https://pg.paymaya.com';
    this.publicKey = publicKey;
    this.fetchConfigHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(this.publicKey)}`
      }
    };
    return PayMayaClientSDK.instance
  }

  async _genericRequestFn(requestMethod, requestBody, url) {
    const config = {
      ...this.fetchConfigHeaders,
      method: requestMethod,
      body: JSON.stringify(requestBody)
    };
    const apiCall = await fetch(`${this.apiUrl}${url}`, config);
    const response = await apiCall.json();
    if (apiCall.status === 200 && response.redirectUrl !== undefined && response.redirectUrl !== '') {
      return response;
    } else {
      throw response
    }
  }

  // TODO: switch url compare value
  getTransactionId(callback) {
    window.addEventListener('message', (event) => {
      if (event.origin === 'https://codingspace.atthouse.pl') {
        const data = JSON.parse(event.data);
        callback(data.paymentTokenId)
      }
    })
  }

  async createCheckout(checkoutRequestObject) {
    const response = await this._genericRequestFn('POST', checkoutRequestObject, '/checkout/v1/checkouts');
    window.location.href = response.redirectUrl;
  }

  async createWalletLink(walletLinkRequestObject) {
    const response = await this._genericRequestFn('POST', walletLinkRequestObject, '/payby/v2/paymaya/link');
    window.location.href = response.redirectUrl;
  }

  async createSinglePayment(singlePaymentRequestObject) {
    const response = await this._genericRequestFn('POST', singlePaymentRequestObject, '/payby/v2/paymaya/payments');
    window.location.href = response.redirectUrl;
  }

  createCreditCardForm(targetHtmlElement) {
    const iframeInstance = document.createElement('iframe');
    iframeInstance.setAttribute('id', 'paymaya-card-form');
    // TODO: switch url
    iframeInstance.setAttribute('src', `https://codingspace.atthouse.pl/?sandbox=${this.isSandbox ? 'true' : 'false'}&publicKey=${btoa(this.publicKey)}`);
    targetHtmlElement.appendChild(iframeInstance);
  }
}
