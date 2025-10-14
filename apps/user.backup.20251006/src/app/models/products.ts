export interface RelatedProductsParams {
    productId: string;
    currency: string;
    tags: string;
    paymentVendor?: string;
}

export interface Products {
    result: Product[];
}

export interface Amount {
    currencyPrefix: string;
    currencySuffix: string;
    recurrent: number;
    display: string;
}

export interface Product {
    detail: string;
    category: string;
    productId: string;
    popular: boolean;
    price: {
        amount: {
            [currency: string]: Amount;
        };
    };
    properties: {
        informalTitle: string;
        informalSubtitle: string;
        messageSave: string;
        usePriceInTitles: boolean;
    };
}
