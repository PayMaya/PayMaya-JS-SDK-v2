export const paymentExampleObject = {
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
      "shippingType": "ST"
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
