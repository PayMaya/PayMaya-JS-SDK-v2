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
    console.log(checkoutId, redirectUrl);
    window.location.href = redirectUrl;
  }

}

function encodeBase64String(string) {
  return btoa(string);
}

const b64 = "pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah:";

const p = new PayMayaClientSDK(b64, true);

async function triggerClick() {
  // await p.triggerCheckout(paymentExampleObject)
  console.log('i can trigger checkout here')
}

// function onSubmit(e) {
//   e.preventDefault();
//   console.log(new FormData(document.getElementById('form')))
// }
// document.getElementById('form').addEventListener('submit', onSubmit)

document.getElementById('trigger').addEventListener('click', triggerClick);
