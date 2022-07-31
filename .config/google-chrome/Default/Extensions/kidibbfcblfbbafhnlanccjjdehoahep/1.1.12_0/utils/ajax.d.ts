/// <reference types="react-native" />
export interface IAjaxRequest {
    method?: 'GET' | 'POST' | 'DELETE';
    url: string;
    body?: string | FormData;
    headers?: {
        [index: string]: string;
    };
}
export interface IAjaxResponse {
    body?: any;
    responseUrl: string;
}
export declare const serialize: (obj: any) => string;
export declare const ajax: (params: IAjaxRequest) => Promise<IAjaxResponse>;
