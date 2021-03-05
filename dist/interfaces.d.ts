export interface CreateCheckoutObject {
    totalAmount: TotalAmount;
    buyer?: Buyer;
    items: Item[];
    redirectUrl?: RedirectUrls;
    requestReferenceNumber: string;
    metadata: {};
}
export interface CreateWalletLinkObject extends RedirectUrls {
    requestReferenceNumber: string;
    metadata: {};
}
export interface CreateSinglePaymentObject extends RedirectUrls {
    totalAmount: {
        currency: string;
        value: string;
    };
    requestReferenceNumber: string;
    metadata: {};
}
export interface CreditCardFormOptions {
    buttonText: string;
    buttonColor: string;
    buttonTextColor: string;
    showLogo: boolean;
}
interface TotalAmount {
    value: number;
    currency: string;
    details?: Details;
}
interface Details {
    discount?: number;
    serviceCharge?: number;
    shippingFee?: number;
    tax?: number;
    subtotal?: number;
}
interface Buyer {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    birthday?: string;
    customerSince?: string;
    sex?: string;
    contact?: {
        phone?: string;
        email?: string;
    };
    shippingAddress?: ShippingAddress;
    billingAddress?: BillingAddress;
}
declare enum ShippingType {
    ST = "ST",
    SD = "SD"
}
interface ShippingAddress extends BillingAddress {
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
    email: string;
    shippingType: ShippingType;
}
interface BillingAddress {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    countryCode?: string;
}
interface Item {
    name: string;
    quantity?: number;
    code?: string;
    description?: string;
    amount?: Amount;
    totalAmount: Amount;
}
interface Amount {
    value: number;
    details?: Details;
}
interface RedirectUrls {
    success?: string;
    failure?: string;
    cancel?: string;
}
export {};
