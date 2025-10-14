export interface GetDebitsParams {
    subscriptionId: string | undefined;
    withFirstPayment: boolean;
    limit: number;
    descendingOrder: boolean;
    status: string;
}

export interface Debits {
    debits: Debit[];
}

export interface Debit {
    isFirstPayment: boolean;
    status: string;
    amount: number;
    currency: string;
    dueDate: string;
    providerType: string;
}
