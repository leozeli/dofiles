/// <reference types="chrome" />
export declare class Image {
    private imageUploadUrl;
    private imageDownloadUrl;
    private imageServerUrl;
    private imageSearchHandle;
    private extractImageHandle;
    private screenshotSearchHandle;
    private imageSearchMap;
    constructor();
    init(): Promise<void>;
    updateImageSearchContextMenu(): Promise<void>;
    updateExtractImageContextMenu(): Promise<void>;
    updateScreenshotSearchContextMenu(): Promise<void>;
    downloadExtractImages(sender: any, files: any): void;
    beginImageSearch(base64orUrl: string): Promise<void>;
    screenshotSearch(_info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab): Promise<void>;
    private migrateHistory;
    private updateImageUploadUrl;
    private updateImageDownloadUrl;
    private getImageServer;
    private extractImages;
}
