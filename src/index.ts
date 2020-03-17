import {
    CreateCheckoutObject,
    CreateSinglePaymentObject,
    CreateWalletLinkObject,
    CreditCardFormOptions
} from './interfaces';

class PayMayaSDK {
    private publicKey: string = '';
    private isSandbox: boolean = true;
    private apiUrl: string = this.isSandbox ? 'https://pg-sandbox.paymaya.com' : 'https://pg.paymaya.com';
    private formUrl: string = this.isSandbox ? 'https://paymayajs-staging.s3.amazonaws.com/dist/index.html' : 'https://paymayajs.s3.amazonaws.com/dist/index.html';

    public init(publicKey: string, isSandbox: boolean) {
        this.publicKey = publicKey;
        this.isSandbox = isSandbox;
    }

    private checkData(data: any) {
        if (!data) {
            throw Error()
        }
    }

    private checkIfInitialized() {
        if (this.publicKey === '') {
            throw Error('You must first run init() method!')
        }
    }

    private async genericRequestFn(requestMethod: string, requestBody: any, url: string) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(this.publicKey)}`
            },
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
    public addTransactionHandler(callback: (arg: string) => void) {
        try {
            this.checkIfInitialized();
            this.checkData({}.toString.call(callback) === '[object Function]');
            window.addEventListener('message', (event) => {
                if (event.origin === 'https://paymayajs-staging.s3.amazonaws.com' || event.origin === 'https://paymayajs.s3.amazonaws.com') {
                    const data = JSON.parse(event.data);
                    callback(data.paymentTokenId)
                }
            })
        } catch (e) {
            console.error(e);
            console.error('SDK: getTransactionId(callback) - callback must be a function')
        }

    }

    public async createCheckout(checkoutRequestObject: CreateCheckoutObject) {
        try {
            this.checkIfInitialized();
            const response = await this.genericRequestFn('POST', checkoutRequestObject, '/checkout/v1/checkouts');
            window.location.href = response.redirectUrl;
        } catch (e) {
            console.error(e);
            console.error('SDK: createCheckout(checkoutRequestObject) - error');
        }
    }

    public async createWalletLink(walletLinkRequestObject: CreateWalletLinkObject) {
        try {
            this.checkIfInitialized();
            const response = await this.genericRequestFn('POST', walletLinkRequestObject, '/payby/v2/paymaya/link');
            window.location.href = response.redirectUrl;
        } catch (e) {
            console.error(e);
            console.error('SDK: createWalletLink(walletLinkRequestObject) - error');
        }
    }

    public async createSinglePayment(singlePaymentRequestObject: CreateSinglePaymentObject) {
        try {
            this.checkIfInitialized();
            const response = await this.genericRequestFn('POST', singlePaymentRequestObject, '/payby/v2/paymaya/payments');
            window.location.href = response.redirectUrl;
        } catch (e) {
            console.error(e);
            console.error('SDK: createSinglePayment(singlePaymentRequestObject) - error');
        }
    }

    public createCreditCardForm(targetHtmlElement: HTMLElement, options?: CreditCardFormOptions) {
        try {
            this.checkIfInitialized();
            this.checkData(targetHtmlElement instanceof HTMLElement);
            const iframeInstance = document.createElement('iframe');
            iframeInstance.setAttribute('id', 'paymaya-card-form');
            iframeInstance.setAttribute('src', `${this.formUrl}?sandbox=${String(this.isSandbox)}&publicKey=${this.publicKey}&options=${options ? JSON.stringify(options) : ''}`);
            targetHtmlElement.appendChild(iframeInstance);
            return this;
        } catch (e) {
            console.error(e);
            console.error('SDK: createCreditCardform(targetHtmlElement, options) - error');
        }
    }
}

export default new PayMayaSDK();
