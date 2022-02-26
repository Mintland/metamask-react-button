"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// src/Wallet.tsx
var utils_1 = require("./utils");
/** @type {*} */
// eslint-disable-next-line no-unused-vars
var Providers = (_a = {},
    _a["Coinbase" /* Coinbase */] = function (ethereum) {
        return ethereum.isCoinBaseWallet || ethereum.isCoinbaseWallet;
    },
    _a["Metamask" /* Metamask */] = function (ethereum) { return ethereum.isMetaMask; },
    _a);
function detectWalletProvider(wallet) {
    return new Promise(function (resolve, reject) {
        var ethereum = window.ethereum;
        function handleConnect() {
            window.removeEventListener("ethereum#initialized", handleConnect);
            // find specific provider (Metamask, Coinbase)
            var provider = ethereum.providers.filter(function (_provider) {
                return Providers[wallet](_provider);
            });
            if (provider.length)
                resolve(provider[0]);
            else
                reject(new Error("No Provider")); // if no provider found, reject
        }
        if (ethereum !== undefined) {
            if ((0, utils_1.isMultiWalletEnvironment)())
                return handleConnect();
            else if (Providers[wallet](ethereum))
                resolve(ethereum);
        }
        window.addEventListener("ethereum#initialized", handleConnect, {
            once: true,
        });
        setTimeout(function () {
            reject(new Error("Timeout"));
        }, utils_1.TIMEOUT);
    });
}
exports.default = detectWalletProvider;
