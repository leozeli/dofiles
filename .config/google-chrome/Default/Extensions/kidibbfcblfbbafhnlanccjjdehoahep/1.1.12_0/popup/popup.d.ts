import * as React from 'react';
import { RouterStore } from './stores/routerStore';
interface IPopupInjectedProps {
    routerStore: RouterStore;
}
export declare class Popup extends React.Component {
    get injected(): IPopupInjectedProps;
    constructor(props: any);
    render(): JSX.Element;
    private getMainContent;
}
export {};
