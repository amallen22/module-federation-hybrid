export interface Error {
    error: string;
    request: XMLHttpRequest;
    status: number;
    statusText: string;
    stack: any;
    response: {
        req: any;
    };
}
