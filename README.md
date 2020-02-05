## Overview

This is web SDK for PayMaya payment gate. It helps dealing with payments on client side. 

## Install

--- to be done ---

## Run

You can either import it like:

```javascript
import payMayaSDK from 'paymayaSDK'
```

or simply include it in your script tag on your HTML site:

```html
<script src="https://paymayabucket.com/paymaya-minified.js"></script>
```

## Available methods

After including PayMaya SDK library in your code, you should be able to access `PayMayaClientSDK`. Instance of this class enables you to use 4 available methods for dealing with PayMaya payments on your website.

#### triggerCheckout
This method triggers PayMaya API request and if successful redirects page to paymaya checkout gate, where user can finalize his payments. 

| Parameter             | Type   | Description                                                       |
|-----------------------|--------|-------------------------------------------------------------------|
| checkoutRequestObject | object | The object that includes buyer and payment informations and more. |
The `checkoutRequestObject` properties can be found [here.](https://developers.paymaya.com/blog/entry/paymaya-checkout-api-overview#checkoutObject)


#### createWalletLink

#### createSinglePayment

#### initCardForm
This method inserts credit card form inputs into designated html element, making it possible for user to input his credit card information.

| Parameter             | Type   | Description                                                       |
|-----------------------|--------|-------------------------------------------------------------------|
| targetHtmlElement | HTMLElement | An html element that you want form to be inserted into. |
