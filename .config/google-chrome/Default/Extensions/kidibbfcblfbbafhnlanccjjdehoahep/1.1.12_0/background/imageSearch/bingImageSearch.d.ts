import { ISearchResult } from '../../searchResult/stores/searchResultStore';
import { BaseImageSearch } from './baseImageSearch';
export declare class BingImageSearch extends BaseImageSearch {
    protected searchInternal(imageUrl: string, result: ISearchResult, updateResultCallback: () => void): Promise<void>;
    private getResults;
    private fetchResult;
    private getSKeyAndIG;
}
