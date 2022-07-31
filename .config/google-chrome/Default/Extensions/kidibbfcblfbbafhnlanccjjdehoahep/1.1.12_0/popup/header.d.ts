import * as React from 'react';
import { RouterStore } from './stores/routerStore';
interface IHeaderInjectedProps {
    routerStore: RouterStore;
}
export declare class Header extends React.Component {
    get injected(): IHeaderInjectedProps;
    constructor(props: any);
    render(): JSX.Element;
    private getMenuItem;
}
export {};
