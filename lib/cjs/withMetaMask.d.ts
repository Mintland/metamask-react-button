import React from "react";
import { ethers } from "ethers";
interface Error {
    code: number;
    message: string;
    stack: any;
}
export interface WithMetaMaskState {
    isInstalled: boolean;
    isConnected: boolean;
    error: Error | undefined;
}
export default function withMetaMask(WrapperComponent: any): {
    new (props: any): {
        provider: ethers.providers.Web3Provider | undefined;
        componentDidMount(): void;
        send(method: string, params?: any): Promise<any>;
        requestChainId: () => Promise<any>;
        requestAccounts: () => Promise<any>;
        requestSign: (message: string) => Promise<string | -1 | undefined>;
        render(): JSX.Element;
        context: any;
        setState<K extends keyof WithMetaMaskState>(state: WithMetaMaskState | ((prevState: Readonly<WithMetaMaskState>, props: Readonly<any>) => WithMetaMaskState | Pick<WithMetaMaskState, K> | null) | Pick<WithMetaMaskState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<any> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<WithMetaMaskState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<WithMetaMaskState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: globalThis.Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<WithMetaMaskState>): any;
        componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<WithMetaMaskState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<WithMetaMaskState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<WithMetaMaskState>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
};
export {};
