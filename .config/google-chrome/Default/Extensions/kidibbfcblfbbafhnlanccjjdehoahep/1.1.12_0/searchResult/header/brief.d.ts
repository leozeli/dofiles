import * as React from 'react';
import { SearchResultStore } from '../stores/searchResultStore';
interface IBriefInjectedProps {
    searchResultStore: SearchResultStore;
}
export declare class Brief extends React.Component {
    get injected(): IBriefInjectedProps;
    constructor(props: any);
    render(): JSX.Element;
    private getSearchAgainActionItem;
    private getUploadSearchActionItem;
}
export {};
