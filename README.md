## Overview

This is web SDK for PayMaya payment gate. It helps dealing with payments on client side. 

## Install

You can either download it via NPM:

`npm install --save paymaya-sdk`


## Run

You can either import it like:

```javascript
import PaymayaSdkClient from 'paymaya-sdk'
```

or simply include it in your script tag on your HTML site:

```html
<script src="https://paymayabucket.com/paymaya-minified.js"></script>
```

## Available methods

After including PayMaya SDK library in your code, you should be able to access `PayMayaClientSDK` class. Instance of this class allows you to use 3 available methods for dealing with PayMaya payments on your website.

#### `createCheckout(checkoutRequestObject)`
This method redirects user to paymaya checkout gate, where user can finalize his payments.

`checkoutRequestObject` properties are defined defined [here](https://developers.paymaya.com/blog/entry/paymaya-checkout-api-overview#checkoutObject). 

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
This method creates wallet link that allows charging to a Paymaya account.

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
This method creates single payment redirection, allowing user to finalize transaction on PayMaya gate. 

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

#### `getTransactionId(callback)`
This method assigns listener for credit card form method (`createdCreditCardForm`) - whenever user fills all the information required (cvc, credit card number and expiry date) and then tokenize that data, a `callback` will be fired with payment token.

`getTransationId` properties: 

| Parameter             | Type   | Required | Description                                                       |
|-----------------------|--------|----------|--------------------------------------------------------|
| callback | function | Yes | function that will be fired once credit card form is tokenized |

`callback(paymentTokenId)` properties:

| Parameter             | Type   | Required | Description                                                       |
|-----------------------|--------|----------|--------------------------------------------------------|
| paymentTokenId | string | | a string that will be passed as argument to merchant's callback function |

---

#### `createCreditCardForm(targetHtmlElement, options)`
This method created credit card form in selected html element, by embedding a safe iframe instance in it - allowing user to fill his credit card information in a safe manner.

`createdCreditCardForm` properties: 

| Parameter             | Type   | Required | Description                                                       |
|-----------------------|--------|----------|--------------------------------------------------------|
| targetHtmlElement | HTMLElement | Yes | a target html element in which form will be embedded |
| options | object | No | options object containing styling schema |
| options.buttonText | string | No | label text for a button inside the form |
| options.buttonColor | string | No | button color (example: '#000') |
| options.buttonTextColor | string | No | button text color (example: '#000') |
| options.showLogo | boolean | No | boolean whether to show PayMaya logo or not |

