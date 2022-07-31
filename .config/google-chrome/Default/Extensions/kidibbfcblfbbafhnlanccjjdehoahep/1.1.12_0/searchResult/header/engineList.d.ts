import * as React from 'react';
import { SearchResultStore } from '../stores/searchResultStore';
interface IEngineListInjectedProps {
    searchResultStore: SearchResultStore;
}
export declare class EngineList extends React.Component {
    get injected(): IEngineListInjectedProps;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
