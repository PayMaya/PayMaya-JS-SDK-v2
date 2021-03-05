import { CreateCheckoutObject, CreateSinglePaymentObject, CreateWalletLinkObject, CreditCardFormOptions } from './interfaces';
declare class PayMayaSDK {
    private publicKey;
    private isSandbox;
    private apiUrl;
    private formUrl;
    private eventOrigin;
    init(publicKey: string, isSandbox?: boolean): void;
    private checkData;
    private checkIfInitialized;
    private genericRequestFn;
    addTransactionHandler(callback: (arg: string) => void): void;
    createCheckout(checkoutRequestObject: CreateCheckoutObject): Promise<void>;
    createWalletLink(walletLinkRequestObject: CreateWalletLinkObject): Promise<void>;
    createSinglePayment(singlePaymentRequestObject: CreateSinglePaymentObject): Promise<void>;
    createCreditCardForm(targetHtmlElement: HTMLElement, options?: CreditCardFormOptions): this;
}
declare const _default: PayMayaSDK;
export default _default;
