export declare const logPageView: () => Promise<void>;
interface ILogEventRequest {
    category: string;
    action: string;
    label?: string;
    value?: number;
}
export declare const logEvent: (obj: ILogEventRequest) => void;
export {};
