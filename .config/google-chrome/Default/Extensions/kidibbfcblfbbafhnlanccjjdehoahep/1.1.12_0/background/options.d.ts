import { Image } from './image';
import { VideoControl } from './videoControl';
export interface IOptions {
    autoRefresh: boolean;
    displayMode: 1 | 2;
    sortBy: 'relevance' | 'area' | 'width' | 'height';
    extractImages: boolean;
    history: boolean;
    imageSearch: boolean;
    imageSearchNewTabFront: boolean;
    imageSearchUrl_ascii2d: boolean;
    imageSearchUrl_baidu: boolean;
    imageSearchUrl_bing: boolean;
    imageSearchUrl_google: boolean;
    imageSearchUrl_iqdb: boolean;
    imageSearchUrl_saucenao: boolean;
    imageSearchUrl_sogou: boolean;
    imageSearchUrl_tineye: boolean;
    imageSearchUrl_yandex: boolean;
    screenshotSearch: boolean;
    userId: string;
    videoControl: boolean;
    preload_all_images: boolean;
}
export declare const defaultOptions: IOptions;
export declare class Options {
    private options;
    private image;
    private videoControl;
    constructor(image: Image, videoControl: VideoControl);
    getOptions(): any;
    set(key: keyof IOptions, value: any): Promise<void>;
    private init;
}
