export declare const enum Wallet {
    Metamask = "Metamask",
    Coinbase = "Coinbase"
}
export default function detectWalletProvider(wallet: Wallet): Promise<any>;
