import React from "react";
export var MetaMaskContext = React.createContext({});
export var MetaMaskProvider = function (props) {
    var _a = React.useState(undefined), error = _a[0], setError = _a[1];
    var _b = React.useState(false), isConnected = _b[0], setIsConnected = _b[1];
    var _c = React.useState(false), isInstalled = _c[0], setIsInstalled = _c[1];
    var _d = React.useState(undefined), provider = _d[0], setProvider = _d[1];
    return (React.createElement(MetaMaskContext.Provider, { value: {
            error: error,
            setError: setError,
            isConnected: isConnected,
            setIsConnected: setIsConnected,
            isInstalled: isInstalled,
            setIsInstalled: setIsInstalled,
            provider: provider,
            setProvider: setProvider,
        } }, props.children));
};
