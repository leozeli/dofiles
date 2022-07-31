/// <reference types="chrome" />
import Tab = chrome.tabs.Tab;
export declare const getActiveTab: () => Promise<Tab | null>;
