class PayMayaClientSDK {
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
        'Authorization': `Basic ${encodeBase64String(this.publicKey)}`
      }
    };
    return PayMayaClientSDK.instance
  }

  async createCheckout(checkoutRequestObject) {
    const config = {
      ...this.fetchConfigHeaders,
      method: 'POST',
      body: JSON.stringify(checkoutRequestObject)
    };
    const response = await fetch(`${this.apiUrl}/checkout/v1/checkouts`, config);
    const r = await response.json();
    if (r.code !== undefined) {
      throw r.parameters;
    }
    window.location.href = r.redirectUrl;
  }

  async createWalletLink(walletLinkRequestObject) {
    const config = {
      ...this.fetchConfigHeaders,
      method: 'POST',
      body: JSON.stringify(walletLinkRequestObject)
    };
    const response = await fetch(`${this.apiUrl}/payby/v2/paymaya/link`, config);
    const { linkId, redirectUrl } = await response.json();
    window.location.href = redirectUrl;
  }

  async createSinglePayment(singlePaymentRequestObject) {
    const config = {
      ...this.fetchConfigHeaders,
      method: 'POST',
      body: JSON.stringify(singlePaymentRequestObject)
    };
    const response = await fetch(`${this.apiUrl}/payby/v2/paymaya/payments`, config);
    const { paymentId, redirectUrl } = await response.json();
    window.location.href = redirectUrl;
  }
}

function encodeBase64String(string) {
  return btoa(string);
}

const b64 = "pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah:";

const p = new PayMayaClientSDK(b64, true);

async function triggerClick(event) {
  event.preventDefault();
  await p.createCheckout({ items: [], totalAmount: {}, requestReferenceNumber: '1209539' });
}


document.getElementById('trigger').addEventListener('click', triggerClick);
