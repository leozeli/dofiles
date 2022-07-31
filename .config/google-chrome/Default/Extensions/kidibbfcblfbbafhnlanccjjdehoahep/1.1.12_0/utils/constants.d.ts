export declare const BELLO_URL = "https://ainoob.com/bello/noobox";
export declare const NOOBOX_VERSION: string;
export declare const HTML5_VIDEO_CONTROL_OPTION_KEY_PREFIX = "videoControl_website_";
export declare type EngineType = 'google' | 'baidu' | 'yandex' | 'bing' | 'saucenao' | 'tineye' | 'ascii2d' | 'iqdb';
export declare const ENGINE_LIST: EngineType[];
export declare const getEngineImageUrl: (engine: EngineType) => string;
export declare const ENGINE_OPTION_KEY_PREFIX = "imageSearchUrl_";
export declare const getEngineOptionKey: (engine: EngineType) => string;
export declare const ENGINE_WEIGHTS: {
    ascii2d: number;
    baidu: number;
    bing: number;
    google: number;
    iqdb: number;
    saucenao: number;
    tineye: number;
    yandex: number;
};
