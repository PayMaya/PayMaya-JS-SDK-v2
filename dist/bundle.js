!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).PayMayaSDK=e()}(this,(function(){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */function t(t,e,r,n){return new(r||(r=Promise))((function(i,o){function a(t){try{c(n.next(t))}catch(t){o(t)}}function s(t){try{c(n.throw(t))}catch(t){o(t)}}function c(t){t.done?i(t.value):new r((function(e){e(t.value)})).then(a,s)}c((n=n.apply(t,e||[])).next())}))}function e(t,e){var r,n,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,n=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}return new(function(){function r(){this.publicKey="",this.isSandbox=!0,this.apiUrl="",this.formUrl="",this.eventOrigin=""}return r.prototype.init=function(t,e){void 0===e&&(e=!0),this.publicKey=t,this.isSandbox=e,this.isSandbox?(this.apiUrl="https://pg-sandbox.paymaya.com",this.formUrl="https://paymayajs-staging.s3.amazonaws.com/dist/index.html",this.eventOrigin="https://paymayajs-staging.s3.amazonaws.com"):(this.apiUrl="https://pg.paymaya.com",this.formUrl="https://paymayajs.s3.amazonaws.com/dist/index.html",this.eventOrigin="https://paymayajs.s3.amazonaws.com")},r.prototype.checkData=function(t){if(!t)throw Error()},r.prototype.checkIfInitialized=function(){if(""===this.publicKey||""===this.apiUrl||""===this.formUrl||""===this.eventOrigin)throw Error("You must first run init() method!")},r.prototype.genericRequestFn=function(r,n,i){return t(this,void 0,void 0,(function(){var t,o,a;return e(this,(function(e){switch(e.label){case 0:return t={headers:{"Content-Type":"application/json",Authorization:"Basic "+btoa(this.publicKey)},method:r,body:JSON.stringify(n)},[4,fetch(""+this.apiUrl+i,t)];case 1:return[4,(o=e.sent()).json()];case 2:if(a=e.sent(),200===o.status&&void 0!==a.redirectUrl&&""!==a.redirectUrl)return[2,a];throw a}}))}))},r.prototype.addTransactionHandler=function(t){var e=this;try{this.checkIfInitialized(),this.checkData("[object Function]"==={}.toString.call(t)),window.addEventListener("message",(function(r){if(r.origin===e.eventOrigin){var n=JSON.parse(r.data);t(n.paymentTokenId)}}))}catch(t){console.error(t),console.error("SDK: addTransactionHandler(callback) - callback must be a function")}},r.prototype.createCheckout=function(r){return t(this,void 0,void 0,(function(){var t,n;return e(this,(function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),this.checkIfInitialized(),[4,this.genericRequestFn("POST",r,"/checkout/v1/checkouts")];case 1:return t=e.sent(),window.location.href=t.redirectUrl,[3,3];case 2:return n=e.sent(),console.error(n),console.error("SDK: createCheckout(checkoutRequestObject) - error"),[3,3];case 3:return[2]}}))}))},r.prototype.createWalletLink=function(r){return t(this,void 0,void 0,(function(){var t,n;return e(this,(function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),this.checkIfInitialized(),[4,this.genericRequestFn("POST",r,"/payby/v2/paymaya/link")];case 1:return t=e.sent(),window.location.href=t.redirectUrl,[3,3];case 2:return n=e.sent(),console.error(n),console.error("SDK: createWalletLink(walletLinkRequestObject) - error"),[3,3];case 3:return[2]}}))}))},r.prototype.createSinglePayment=function(r){return t(this,void 0,void 0,(function(){var t,n;return e(this,(function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),this.checkIfInitialized(),[4,this.genericRequestFn("POST",r,"/payby/v2/paymaya/payments")];case 1:return t=e.sent(),window.location.href=t.redirectUrl,[3,3];case 2:return n=e.sent(),console.error(n),console.error("SDK: createSinglePayment(singlePaymentRequestObject) - error"),[3,3];case 3:return[2]}}))}))},r.prototype.createCreditCardForm=function(t,e){try{this.checkIfInitialized(),this.checkData(t instanceof HTMLElement);var r=document.createElement("iframe");return r.setAttribute("id","paymaya-card-form"),r.setAttribute("src",this.formUrl+"?sandbox="+String(this.isSandbox)+"&publicKey="+this.publicKey+"&options="+(e?JSON.stringify(e):"")),t.appendChild(r),this}catch(t){console.error(t),console.error("SDK: createCreditCardform(targetHtmlElement, options) - error")}},r}())}));
