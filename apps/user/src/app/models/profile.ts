export interface Profile {
    groupPermission: string;
    user: string;
    userLanguage: string;
    email: string;
    createdAt: string;
    pricingModel: string;
    firstName?: string;
    lastName?: string;
    photo?: string;
}

export interface ProfileSubscription {
    createdAt?: string;
    productId: string;
    subscriptionId: string;
    expirationDate?: string;
}

export interface ProfileInfoParams {
    userLanguage?: string;
    firstName?: string;
    lastName?: string;
    photo?: string | null;
}
