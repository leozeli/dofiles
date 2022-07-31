import { IOptions } from '../../background/options';
export declare class OptionsStore {
    options: IOptions;
    constructor();
    update(key: keyof IOptions, value: any): Promise<void>;
    private init;
}
