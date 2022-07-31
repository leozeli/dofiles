import * as React from 'react';
import { ImageSearchHistoryStore } from './stores/imageSearchHistoryStore';
interface IImageSearchHistoryInjectedProps {
    imageSearchHistoryStore: ImageSearchHistoryStore;
}
export declare class ImageSearchHistory extends React.Component {
    get injected(): IImageSearchHistoryInjectedProps;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
