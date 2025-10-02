export interface updateSubscriptionParams {
    productId: string;
    subscriptionId: string;
}

export interface getSubscriptionsParams {
    subscriptionId: string;
    onlyFinalOutcome?: boolean;
}

export interface updatedSubscription {
    subscriptionId?: string;
    productId?: string;
    createdAt?: string;
    expirationDate?: string;
}
