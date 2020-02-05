export default class PayMayaClientSDK {
  constructor(publicKey, isSandbox) {
    // make sure its singleton
    if (!PayMayaClientSDK.instance) {
      PayMayaClientSDK.instance = this;
    }
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
    if (response.code !== undefined) {
      throw response.parameters;
    }
    return response;
  }

  async createCheckout(checkoutRequestObject) {
    const response = this._genericRequestFn('POST', checkoutRequestObject, '/checkout/v1/checkouts');
    window.location.href = response.redirectUrl;
  }

  async createWalletLink(walletLinkRequestObject) {
    const response = this._genericRequestFn('POST', walletLinkRequestObject, '/payby/v2/paymaya/link');
    window.location.href = response.redirectUrl;
  }

  async createSinglePayment(singlePaymentRequestObject) {
    const response = this._genericRequestFn('POST', singlePaymentRequestObject, '/payby/v2/paymaya/payments');
    window.location.href = response.redirectUrl;
  }
}
