declare type BasicFieldType = 'id' | 'createdAt';
export declare type IDirection = 'forward' | 'backward';
export declare class IndexedDbDao<IRecord, IndexedFieldType extends BasicFieldType> {
    private readonly dbName;
    constructor(dbName: string);
    count(): Promise<number>;
    get(key: string | number, type?: IndexedFieldType): Promise<IRecord | null>;
    add(history: IRecord): Promise<unknown>;
    getDBRequest: () => IDBOpenDBRequest;
    remove(id: string | number): Promise<unknown>;
    clear(): Promise<unknown>;
    iterate({ type, direction, size, key }: {
        key?: any;
        size: number;
        type?: IndexedFieldType;
        direction: IDirection;
    }): Promise<{
        hasNext: boolean;
        recordList: IRecord[];
    }>;
}
export {};
