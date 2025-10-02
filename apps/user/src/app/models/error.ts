export interface ApiError {
    error: string;
    request: XMLHttpRequest;
    status: number;
    statusText: string;
    stack: any;
    response: {
        req: any;
    };
}
