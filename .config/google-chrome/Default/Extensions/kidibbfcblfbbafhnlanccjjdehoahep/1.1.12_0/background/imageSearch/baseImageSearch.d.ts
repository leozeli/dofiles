import { ISearchResult } from '../../searchResult/stores/searchResultStore';
import { EngineType } from '../../utils/constants';
export declare class BaseImageSearch {
    protected readonly engine: EngineType;
    protected readonly domParser: DOMParser;
    constructor(engine: EngineType);
    search(imageUrl: string, cursor: number, result: ISearchResult): Promise<void>;
    protected searchInternal(_imageUrl: string, _result: ISearchResult, _updateResultCallback: () => void): Promise<void>;
    private updateSearchResult;
}
