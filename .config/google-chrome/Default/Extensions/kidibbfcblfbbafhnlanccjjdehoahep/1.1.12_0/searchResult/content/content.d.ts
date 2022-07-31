import * as React from 'react';
import { OptionsStore } from '../../shared/stores/optionsStore';
import { SearchResultStore } from '../stores/searchResultStore';
interface IContentInjectedProps {
    searchResultStore: SearchResultStore;
    optionsStore: OptionsStore;
}
export declare class Content extends React.Component {
    get injected(): IContentInjectedProps;
    render(): JSX.Element;
    private getSortedList;
    private getWallView;
    private getListView;
}
export {};
