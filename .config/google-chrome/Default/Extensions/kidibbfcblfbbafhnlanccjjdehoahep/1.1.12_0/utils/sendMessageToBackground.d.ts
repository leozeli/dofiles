export interface ISendMessageToBackgroundRequest {
    job: 'getCurrentTabAutoRefreshStatus' | 'set' | 'updateAutoRefresh' | 'urlDownloadZip' | 'videoControl' | 'beginImageSearch' | 'analytics' | 'getOptions';
    value?: any;
}
export declare const sendMessageToBackground: (request: ISendMessageToBackgroundRequest) => Promise<any>;
