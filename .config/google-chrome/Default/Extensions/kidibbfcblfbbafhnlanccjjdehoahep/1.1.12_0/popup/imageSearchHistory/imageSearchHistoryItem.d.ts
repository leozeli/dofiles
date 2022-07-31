import * as React from 'react';
import { IImageSearchRecord } from '../../dao/imageSearchDao';
import { ImageSearchHistoryStore } from '../stores/imageSearchHistoryStore';
interface IImageSearchHistoryItemProps {
    imageSearchRecord: IImageSearchRecord;
}
interface IImageSearchHistoryItemInjectedProps {
    imageSearchHistoryStore: ImageSearchHistoryStore;
}
export declare class ImageSearchHistoryItem extends React.Component<IImageSearchHistoryItemProps> {
    get injected(): IImageSearchHistoryItemInjectedProps;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
