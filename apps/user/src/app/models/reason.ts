export interface Reason {
    id: string;
    reasonTemplateTag: string;
    reasonText: string;
    target: {
        page: string;
        config: {
            header: string;
            lowerModule: string;
            productTag: string;
            text: string;
        };
    };
    comment?: {
        placeholder: string;
        required: boolean;
        text?: string;
    };
}

export interface PostReason {
    subscriptionId?: string;
    reasonId?: string;
    comment?: string;
}

export interface PostTechnicalIssue {
    fullName: string;
    email: string;
    message: string;
}
