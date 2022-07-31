export declare type LocationType = 'overview' | 'history' | 'options' | 'about';
export declare class RouterStore {
    location: LocationType;
    goTo(location: LocationType): void;
}
