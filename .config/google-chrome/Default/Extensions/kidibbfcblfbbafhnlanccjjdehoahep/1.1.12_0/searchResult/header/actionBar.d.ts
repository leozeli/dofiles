import * as React from 'react';
import { OptionsStore } from '../../shared/stores/optionsStore';
import { SearchResultStore } from '../stores/searchResultStore';
interface IActionBarInjectedProps {
    searchResultStore: SearchResultStore;
    optionsStore: OptionsStore;
}
export declare class ActionBar extends React.Component {
    get injected(): IActionBarInjectedProps;
    render(): JSX.Element;
}
export {};
