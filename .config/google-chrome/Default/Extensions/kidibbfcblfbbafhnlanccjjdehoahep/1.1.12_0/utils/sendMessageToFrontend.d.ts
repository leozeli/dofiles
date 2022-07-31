export interface ISendMessageToFrontendRequest {
    job: 'image_result_update';
    value?: any;
}
export declare const sendMessageToFrontend: (request: ISendMessageToFrontendRequest) => Promise<any>;
