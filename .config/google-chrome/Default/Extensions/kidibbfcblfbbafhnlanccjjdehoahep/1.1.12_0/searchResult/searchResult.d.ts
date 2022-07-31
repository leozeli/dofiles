import * as React from 'react';
import { SearchResultStore } from './stores/searchResultStore';
interface ISearchResultInjectedProps {
    searchResultStore: SearchResultStore;
}
export declare class SearchResult extends React.Component {
    get injected(): ISearchResultInjectedProps;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
