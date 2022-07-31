import { ISearchResult } from '../../searchResult/stores/searchResultStore';
import { BaseImageSearch } from './baseImageSearch';
export declare class TineyeImageSearch extends BaseImageSearch {
    protected searchInternal(imageUrl: string, result: ISearchResult, updateResultCallback: () => void): Promise<void>;
}
