import { IOptions } from '../background/options';
declare type KeyType = keyof IOptions;
export declare const get: (key: KeyType, defaultValue?: any) => Promise<any>;
export declare const set: (key: KeyType, value: any) => Promise<unknown>;
export declare const bgSet: (key: KeyType, value: any) => Promise<void>;
export declare const getDB: (key: string | number) => Promise<any>;
export declare const setDB: (key: string | number, value: any) => Promise<unknown>;
export declare const deleteDB: (key: string) => Promise<unknown>;
export {};
