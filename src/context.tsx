import React from "react";

export const MetaMaskContext = React.createContext({});

export const MetaMaskProvider = (props: any) => {
    const [error, setError] = React.useState<any>(undefined);
    const [isConnected, setIsConnected] = React.useState<boolean>(false);
    const [isInstalled, setIsInstalled] = React.useState<boolean>(false);
    const [provider, setProvider] = React.useState<any>(undefined);

    return (
        <MetaMaskContext.Provider
            value={{
                error,
                setError,
                isConnected,
                setIsConnected,
                isInstalled,
                setIsInstalled,
                provider,
                setProvider,
            }}
        >
            {props.children}
        </MetaMaskContext.Provider>
    );
};
