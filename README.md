## Overview

Official client side SDK by PayMaya Payment Gateway. For assistance you may reach us through paymayadevs@voyager.ph

## Install


`npm install --save paymaya-js-sdk`

or

`yarn add paymaya-js-sdk`


## Run

You can either import it like:

```javascript
import PaymayaSdkClient from 'paymaya-js-sdk'
```

or simply include it through a script tag on your HTML site:

```html
<script src="https://unpkg.com/paymaya-js-sdk@2.0.1/dist/bundle.js"></script>
```

NOTE: when including via script tags, the SDK is globally available using the variable `PayMayaSDK`

## Usage

Before using any of the publicly available methods, you need to initialize the SDK by using the `init` method (you only need to do this once in app's lifetime).

React:
```js
import paymaya from 'paymaya-js-sdk';

function App() {
  const exampleCheckoutObject = {};
  useEffect(() => {
    paymaya.init('my-public-key', true);
    paymaya.createCheckout(exampleCheckoutObject);
  }, []);
  return (
      <div>
        <div>Test App</div>
      </div>
  );
}
```

or vanilla js
```js
    <script>
      const myExampleObject = {};
      PayMayaSDK.init('my-public-key', true);
      PayMayaSDK.createCheckout(myExampleObject);
    </script>
```

## SDK API

* [init](#initpublickey-issandbox)

* [createCheckout](#createcheckoutcheckoutrequestobject)

* [createWalletLink](#createwalletlinkwalletlinkrequestobject)

* [createSinglePayment](#createsinglepaymentsinglepaymentrequestobject)

* [addTransactionHandler](#addtransactionhandlercallback)

* [createCreditCardForm](#createcreditcardformtargethtmlelement-options)

---

#### `init(publicKey, isSandbox)`
This method initializes SDK. It must be run before other methods are being used.

Returns: `void`

`init` properties:

| Parameter             | Type   | Required | Description                                                       |
|-----------------------|--------|----------|--------------------------------------------------------|
| publicKey | string | Yes | Public API key delivered by PayMaya. |
| isSandbox | boolean | No | Boolean that indicates whether SDK should use sandbox environment or not. Defaults to `true`, if not supplied. |

---

#### `createCheckout(checkoutRequestObject)`
This method redirects the user to PayMaya Checkout, where the user can finalize his/her payment.

Returns: `Promise<void>`

`checkoutRequestObject` properties are defined [here](https://developers.paymaya.com/blog/entry/paymaya-checkout-api-overview#checkoutObject).

Example `checkoutRequestObject`:
```json
{
  "totalAmount": {
    "value": 100,
    "currency": "PHP",
    "details": {
      "discount": 0,
      "serviceCharge": 0,
      "shippingFee": 0,
      "tax": 0,
      "subtotal": 100
    }
  },
  "buyer": {
    "firstName": "John",
    "middleName": "Paul",
    "lastName": "Doe",
    "birthday": "1995-10-24",
    "customerSince": "1995-10-24",
    "sex": "M",
    "contact": {
      "phone": "+639181008888",
      "email": "merchant@merchantsite.com"
    },
    "shippingAddress": {
      "firstName": "John",
      "middleName": "Paul",
      "lastName": "Doe",
      "phone": "+639181008888",
      "email": "merchant@merchantsite.com",
      "line1": "6F Launchpad",
      "line2": "Reliance Street",
      "city": "Mandaluyong City",
      "state": "Metro Manila",
      "zipCode": "1552",
      "countryCode": "PH",
      "shippingType": "ST" // ST - for standard, SD - for same day
    },
    "billingAddress": {
      "line1": "6F Launchpad",
      "line2": "Reliance Street",
      "city": "Mandaluyong City",
      "state": "Metro Manila",
      "zipCode": "1552",
      "countryCode": "PH"
    }
  },
  "items": [
    {
      "name": "Canvas Slip Ons",
      "quantity": 1,
      "code": "CVG-096732",
      "description": "Shoes",
      "amount": {
        "value": 100,
        "details": {
          "discount": 0,
          "serviceCharge": 0,
          "shippingFee": 0,
          "tax": 0,
          "subtotal": 100
        }
      },
      "totalAmount": {
        "value": 100,
        "details": {
          "discount": 0,
          "serviceCharge": 0,
          "shippingFee": 0,
          "tax": 0,
          "subtotal": 100
        }
      }
    }
  ],
  "redirectUrl": {
    "success": "https://www.merchantsite.com/success",
    "failure": "https://www.merchantsite.com/failure",
    "cancel": "https://www.merchantsite.com/cancel"
  },
  "requestReferenceNumber": "1551191039",
  "metadata": {}
}
```

---

#### `createWalletLink(walletLinkrequestObject)`
This method creates a wallet link that allows charging to a PayMaya account.

Returns `Promise<void>`

`walletLinkRequestObject` properties:

| Parameter             | Type   | Required | Description                                                       |
|-----------------------|--------|----------|--------------------------------------------------------|
| redirectUrl | object | | Object containing merchant's callback urls |
| redirectUrl.success | string | | Url that the user will be redirected on after successful payment |
| redirectUrl.failure | string | | Url that the user will be redirected on after failed payment |
| redirectUrl.cancel | string | | Url that the user will be redirected on after canceled payment |
| requestReferenceNumber | string | | Request reference number |
| metadata | object | No | Additional information regarding payment |

---

#### `createSinglePayment(singlePaymentRequestObject)`
This method creates a single payment redirection, allowing the user to finalize the transaction.

Returns `Promise<void>`

`createSinglePayment` properties:

| Parameter             | Type   | Required | Description                                                       |
|-----------------------|--------|----------|--------------------------------------------------------|
| totalAmount | object | | Object containing payment amount |
| totalAmount.currency | string | | Currency of transaction |
| totalAmount.value | string | | Value of transaction |
| redirectUrl | object | | Object containing merchant's callback urls |
| redirectUrl.success | string | | Url that the user will be redirected on after successful payment |
| redirectUrl.failure | string | | Url that the user will be redirected on after failed payment |
| redirectUrl.cancel | string | | Url that the user will be redirected on after canceled payment |
| requestReferenceNumber | string | | Request reference number |
| metadata | object | | Additional information regarding payment |


---

#### `addTransactionHandler(callback)`
This method assigns a listener for credit card form method [createdCreditCardForm](#createcreditcardformtargethtmlelement-options) - whenever the user fills all the information required (cvc, credit card number and expiry date) and then tokenizes that data, a `callback` will be fired with payment token.

Returns `void`

Example usage:

```js
sdk
  .createCreditCardForm(iframeContainer, {})
  .addTransactionHandler((paymentTokenId) => this.setState({open: true, iframe: true, bodyResponse: {paymentTokenId}}))
```
`addTransactionHandler` properties:

| Parameter             | Type   | Required | Description                                                       |
|-----------------------|--------|----------|--------------------------------------------------------|
| callback | function | Yes | function that will be fired once credit card form is tokenized |

`callback(paymentTokenId)` properties:

| Parameter             | Type   | Required | Description                                                       |
|-----------------------|--------|----------|--------------------------------------------------------|
| paymentTokenId | string | | a string that will be passed as argument to merchant's callback function |

---

#### `createCreditCardForm(targetHtmlElement, options)`
This method creates a credit card form in selected html element, by embedding a safe iframe instance in it - allowing the user to fill his credit card information in a safe manner.

Returns `void`

`createdCreditCardForm` properties:

| Parameter             | Type   | Required | Description                                                       |
|-----------------------|--------|----------|--------------------------------------------------------|
| targetHtmlElement | HTMLElement | Yes | a target html element in which form will be embedded |
| options | object | No | options object containing styling schema |
| options.buttonText | string | No | label text for a button inside the form |
| options.buttonColor | string | No | button color (example: '#000') |
| options.buttonTextColor | string | No | button text color (example: '#000') |
| options.showLogo | boolean | No | boolean whether to show PayMaya logo or not |

## Examples

A sample React.JS project is available under [/example](https://github.com/PayMaya/PayMaya-JS-SDK-v2/tree/master/example) in the repo.

```sh
git clone git@github.com:PayMaya/PayMaya-JS-SDK-v2.git
cd PayMaya-JS-SDK-v2
npm ci
cd example
npm ci
npm start
```