"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// src/Wallet.tsx
var utils_1 = require("./utils");
/** @type {*} */
var Providers = (_a = {},
    _a["Coinbase" /* Coinbase */] = function (ethereum) {
        return ethereum.isCoinBaseWallet || ethereum.isCoinbaseWallet;
    },
    _a["Metamask" /* Metamask */] = function (ethereum) { return ethereum.isMetaMask; },
    _a);
/**
 *
 *
 * @export
 * @param {Wallet} walletName
 * @return {*}  {Promise<any>}
 */
function detectWalletProvider(wallet) {
    return new Promise(function (resolve, reject) {
        var ethereum = window.ethereum;
        function handleConnect() {
            window.removeEventListener("ethereum#initialized", handleConnect);
            // find specific provider (Metamask, Coinbase)
            var provider = ethereum.providers.filter(function (_provider) { return Providers[wallet](_provider); });
            if (provider.length)
                resolve(provider[0]);
            else
                reject(); // if no provider found, reject
        }
        if (ethereum !== undefined) {
            if ((0, utils_1.isMultiWalletEnvironment)())
                return handleConnect();
            else if (Providers[wallet](ethereum))
                resolve(ethereum);
        }
        window.addEventListener("ethereum#initialized", handleConnect, { once: true });
        setTimeout(function () {
            reject();
        }, utils_1.TIMEOUT);
    });
}
exports.default = detectWalletProvider;
