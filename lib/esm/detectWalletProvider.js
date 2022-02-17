var _a;
// src/Wallet.tsx
import { isMultiWalletEnvironment, TIMEOUT } from "./utils";
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
export default function detectWalletProvider(wallet) {
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
            if (isMultiWalletEnvironment())
                return handleConnect();
            else if (Providers[wallet](ethereum))
                resolve(ethereum);
        }
        window.addEventListener("ethereum#initialized", handleConnect, { once: true });
        setTimeout(function () {
            reject();
        }, TIMEOUT);
    });
}
