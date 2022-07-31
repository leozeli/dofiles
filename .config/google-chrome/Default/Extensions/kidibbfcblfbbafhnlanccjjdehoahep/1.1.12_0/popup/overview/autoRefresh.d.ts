import * as React from 'react';
import { AutoRefreshStore } from '../stores/autoRefreshStore';
interface IAutoRefreshInjectedProps {
    autoRefreshStore: AutoRefreshStore;
}
export declare class AutoRefresh extends React.Component {
    get injected(): IAutoRefreshInjectedProps;
    constructor(props: any);
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
