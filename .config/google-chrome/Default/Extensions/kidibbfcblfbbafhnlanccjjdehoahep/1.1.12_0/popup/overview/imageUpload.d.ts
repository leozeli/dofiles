import * as React from 'react';
import { ImageStore } from '../stores/imageStore';
interface IImageUploadInjectedProps {
    imageStore: ImageStore;
}
export declare class ImageUpload extends React.Component {
    get injected(): IImageUploadInjectedProps;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
