import { ISearchResult } from '../../searchResult/stores/searchResultStore';
import { BaseImageSearch } from './baseImageSearch';
export declare class YandexImageSearch extends BaseImageSearch {
    protected searchInternal(imageUrl: string, result: ISearchResult, updateResultCallback: () => void): Promise<void>;
    private getKeyword;
    private getResults;
}
