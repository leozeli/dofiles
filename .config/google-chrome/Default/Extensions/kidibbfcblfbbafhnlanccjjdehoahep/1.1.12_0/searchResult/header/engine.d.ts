import * as React from 'react';
import { EngineType } from '../../utils/constants';
import { SearchResultStore } from '../stores/searchResultStore';
interface IEngineProps {
    engine: EngineType;
}
interface IEngineInjectedProps {
    searchResultStore: SearchResultStore;
}
export declare class Engine extends React.Component<IEngineProps> {
    get injected(): IEngineInjectedProps;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
