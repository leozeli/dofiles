import * as React from 'react';
interface IFooterInjectedProps {
    temp: boolean;
}
export declare class Footer extends React.Component {
    get injected(): IFooterInjectedProps;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
