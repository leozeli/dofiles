import { OptionsStore } from '../../shared/stores/optionsStore';
import { EngineType } from '../../utils/constants';
interface IImageInfo {
    height?: number;
    width?: number;
}
interface ISearchImageInfo {
    engine: EngineType;
    keyword: string;
    keywordLink: string;
}
export interface ISingleSearchResultItem {
    description: string;
    imageInfo: IImageInfo;
    imageUrl: string;
    searchEngine: EngineType;
    sourceUrl: string;
    thumbUrl: string;
    title: string;
    weight: number;
}
export declare type EngineStatusType = 'disabled' | 'loading' | 'loaded' | 'error';
export interface ISearchResult {
    url?: string;
    base64?: string;
    engineLink?: {
        [key in EngineType]?: string;
    };
    searchImageInfo?: ISearchImageInfo[];
    searchResult?: ISingleSearchResultItem[];
    engineStatus?: {
        [key in EngineType]?: EngineStatusType;
    };
}
export declare class SearchResultStore {
    result: ISearchResult;
    modelImageUrl: string;
    modelImageWidth: number;
    modelOpened: boolean;
    private optionsStore;
    private cursor;
    constructor(optionsStore: OptionsStore);
    closeImageModel(): void;
    openImageModel(modelImageUrl: string): Promise<void>;
    searchImage(base64OrUrl: string): Promise<void>;
    uploadSearch(img: any): Promise<void>;
    private preLoadImage;
    private updatePatchImg;
    updateResult(forceUpdate?: boolean): Promise<void>;
    private setUpListener;
}
export {};
