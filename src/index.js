import { paymentExampleObject } from './exampleData';

console.log('test paymaya sdk');
console.log(process.env.PAYMAYA_URL);


class PayMayaClientSDK {
  constructor(publicKey, isSandbox) {
    // make sure its singleton
    if (!PayMayaClientSDK.instance) {
      PayMayaClientSDK.instance = this;
    }
    this.apiUrl = isSandbox ? 'https://pg-sandbox.paymaya.com/checkout/v1/checkouts' : 'wrong';
    this.publicKey = publicKey;
    return PayMayaClientSDK.instance
  }



  async triggerCheckout(paymentRequestBody) {
    const fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodeBase64String(this.publicKey)}`
      },
      body: JSON.stringify(paymentRequestBody)
    };
    const response = await fetch(this.apiUrl, fetchConfig);
    const { checkoutId, redirectUrl } = await response.json();
    console.log(checkoutId, redirectUrl)
    window.location.href = redirectUrl;
    // const ifrm = document.createElement('iframe');
    // ifrm.setAttribute('src', redirectUrl);
    // ifrm.setAttribute('id', 'paymaya-iframe');
    // ifrm.style.width = '640px';
    // ifrm.style.height = '480px';
    // document.body.appendChild(ifrm);
    // const win = window.open(redirectUrl, '_blank');
    // win.document.write(`<!--<iframe width="560" height="315" src="${redirectUrl}"></iframe>-->`)
  }

}

function encodeBase64String(string) {
  return btoa(string);
}

console.log(PayMayaClientSDK, 'SDK class')

const b64 = "pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah:";

const p = new PayMayaClientSDK(b64, true);
p.triggerCheckout(paymentExampleObject).then(res => console.log(res));
