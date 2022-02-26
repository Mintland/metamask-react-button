"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaMaskProvider = exports.MetaMaskContext = void 0;
var react_1 = __importDefault(require("react"));
exports.MetaMaskContext = react_1.default.createContext({});
var MetaMaskProvider = function (props) {
    var _a = react_1.default.useState(undefined), error = _a[0], setError = _a[1];
    var _b = react_1.default.useState(false), isConnected = _b[0], setIsConnected = _b[1];
    var _c = react_1.default.useState(false), isInstalled = _c[0], setIsInstalled = _c[1];
    var _d = react_1.default.useState(undefined), provider = _d[0], setProvider = _d[1];
    return (react_1.default.createElement(exports.MetaMaskContext.Provider, { value: {
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
exports.MetaMaskProvider = MetaMaskProvider;
