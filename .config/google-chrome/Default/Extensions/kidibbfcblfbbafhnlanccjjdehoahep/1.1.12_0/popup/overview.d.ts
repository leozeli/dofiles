import * as React from 'react';
import { OptionsStore } from '../shared/stores/optionsStore';
interface IOverviewInjectedProps {
    optionsStore: OptionsStore;
}
export declare class Overview extends React.Component {
    get injected(): IOverviewInjectedProps;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
