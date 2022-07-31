import { ISearchResult } from '../searchResult/stores/searchResultStore';
import { IndexedDbDao } from './indexedDbDao';
export interface IImageSearchRecord {
    result: ISearchResult;
    createdAt: number;
    id: number;
}
export declare type ImageSearchFieldType = 'id' | 'createdAt';
declare class ImageSearchDao extends IndexedDbDao<IImageSearchRecord, ImageSearchFieldType> {
    constructor();
}
export declare const imageSearchDao: ImageSearchDao;
export {};
