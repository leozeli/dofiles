import * as React from 'react';
import { VideoControlStore } from '../stores/videoControlStore';
interface IVideoControlInjectedProps {
    videoControlStore: VideoControlStore;
}
export declare class VideoControl extends React.Component {
    get injected(): IVideoControlInjectedProps;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
