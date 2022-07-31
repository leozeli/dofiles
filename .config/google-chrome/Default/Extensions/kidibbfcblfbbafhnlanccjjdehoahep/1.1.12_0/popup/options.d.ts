import * as React from 'react';
import { OptionsStore } from '../shared/stores/optionsStore';
interface IOptionsInjectedProps {
    optionsStore: OptionsStore;
}
export declare class Options extends React.Component {
    get injected(): IOptionsInjectedProps;
    constructor(props: any);
    render(): JSX.Element;
    private getEngines;
    private getCheckBox;
}
export {};
