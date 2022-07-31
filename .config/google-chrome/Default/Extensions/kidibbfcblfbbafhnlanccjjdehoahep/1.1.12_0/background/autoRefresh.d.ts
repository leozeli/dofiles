export interface ITabStatus {
    handler?: any;
    interval: number;
    lastRefreshedAt: null | number;
    isFirstTimeInterval: boolean;
    firstTimeInterval: number;
}
export declare const defaultTabStatus: ITabStatus;
export interface IUpdateAutoRefresh {
    tabId: number;
    active: boolean;
    interval?: number;
    startAt?: number;
    shouldLogEvent?: boolean;
}
export declare class AutoRefresh {
    private tabs;
    clear(tabId: number): void;
    delete(tabId: number): void;
    update(params: IUpdateAutoRefresh): ITabStatus | undefined;
    getSetting(tabId: number): ITabStatus;
    private performAutoRefresh;
}
