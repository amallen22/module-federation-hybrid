import { ProductSlice } from './slices/productSlice';
import { UISlice } from './slices/uiSlice';
export type StoreState = ProductSlice & UISlice;
export declare const useStore: import("zustand").UseBoundStore<Omit<Omit<Omit<import("zustand").StoreApi<StoreState>, "setState" | "devtools"> & {
    setState(partial: StoreState | Partial<StoreState> | ((state: StoreState) => StoreState | Partial<StoreState>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: StoreState | ((state: StoreState) => StoreState), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<StoreState, {
            theme: "light" | "dark";
            cart: import("./types").CartItem[];
            isCartOpen: boolean;
        }>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: StoreState) => void) => () => void;
        onFinishHydration: (fn: (state: StoreState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<StoreState, {
            theme: "light" | "dark";
            cart: import("./types").CartItem[];
            isCartOpen: boolean;
        }>>;
    };
}, "setState"> & {
    setState(nextStateOrUpdater: StoreState | Partial<StoreState> | ((state: import("immer").WritableDraft<StoreState>) => void), shouldReplace?: false, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(nextStateOrUpdater: StoreState | ((state: import("immer").WritableDraft<StoreState>) => void), shouldReplace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
}>;
