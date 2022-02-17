export declare const enum Wallet {
    Metamask = "Metamask",
    Coinbase = "Coinbase"
}
/**
 *
 *
 * @export
 * @param {Wallet} walletName
 * @return {*}  {Promise<any>}
 */
export default function detectWalletProvider(wallet: Wallet): Promise<any>;
