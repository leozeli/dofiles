import { IImageSearchRecord } from '../../dao/imageSearchDao';
export declare class ImageSearchHistoryStore {
    imageSearchList: IImageSearchRecord[];
    private imageSearchHasNext;
    private imageSearchLoadOrderDirection;
    private imageSearchLoadOrderType;
    private imageSearchLoadStatus;
    private lastScrollDate;
    constructor();
    loadInitialHistoryList(): Promise<void>;
    delete(cursor: number): Promise<void>;
    deleteAll(): Promise<void>;
    loadMore(): Promise<void>;
    scroll(): Promise<void>;
    private setUpListener;
}
