export declare type StateType = 'notStarted' | 'inProgress' | 'completed' | 'error';
export interface IAsyncStatus {
    state: StateType;
    error?: string;
}
export declare const getDefaultAsyncStatus: () => IAsyncStatus;
export declare class ImageStore {
    status: IAsyncStatus;
    uploadImage(file: any): Promise<void>;
}
