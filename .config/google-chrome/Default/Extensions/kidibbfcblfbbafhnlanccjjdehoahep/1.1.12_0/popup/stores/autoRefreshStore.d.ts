import { IUpdateAutoRefresh } from '../../background/autoRefresh';
export declare class AutoRefreshStore {
    elapsedTime: number;
    active: boolean;
    interval: number;
    private tabStatus;
    private handle;
    getCurrentTabStatus(): Promise<void>;
    updateAutoRefresh(request: IUpdateAutoRefresh): Promise<void>;
    private updateInfo;
}
