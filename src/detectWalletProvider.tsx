// src/Wallet.tsx
import { isMultiWalletEnvironment, TIMEOUT } from "./utils";

export const enum Wallet {
    // eslint-disable-next-line no-unused-vars
    Metamask = "Metamask",
    // eslint-disable-next-line no-unused-vars
    Coinbase = "Coinbase", // Coming soon
}

/** @type {*} */
// eslint-disable-next-line no-unused-vars
const Providers: { [key in Wallet]: (...args: any[]) => any } = {
    [Wallet.Coinbase]: (ethereum: any) =>
        ethereum.isCoinBaseWallet || ethereum.isCoinbaseWallet,
    [Wallet.Metamask]: (ethereum: any) => ethereum.isMetaMask,
};

export default function detectWalletProvider(wallet: Wallet): Promise<any> {
    return new Promise((resolve, reject) => {
        const { ethereum } = window;

        function handleConnect() {
            window.removeEventListener("ethereum#initialized", handleConnect);

            // find specific provider (Metamask, Coinbase)
            const provider = ethereum.providers.filter((_provider: any) =>
                Providers[wallet](_provider)
            );

            if (provider.length) resolve(provider[0]);
            else reject(new Error("No Provider")); // if no provider found, reject
        }

        if (ethereum !== undefined) {
            if (isMultiWalletEnvironment()) return handleConnect();
            else if (Providers[wallet](ethereum)) resolve(ethereum);
        }

        window.addEventListener("ethereum#initialized", handleConnect, {
            once: true,
        });
        setTimeout(() => {
            reject(new Error("Timeout"));
        }, TIMEOUT);
    });
}
